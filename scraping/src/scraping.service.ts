import { Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";

interface ISavedData {
  user: string;
  products:
    | {
        name: string;
        price: number;
      }[]
    | undefined;
  error?: any;
}

@Injectable()
export class ScrapingService {
  async scrape() {
    const browser = await puppeteer.launch({ headless: false });
    const savedData: ISavedData[] = [];

    try {
      const { usernameList, password } = await this.getLoginCredentials(
        browser
      );

      for (let index = 0; index < usernameList.length; index++) {
        const products = await this.getProducts(
          browser,
          usernameList[index],
          password
        );

        console.log(
          `produtos coletados para o usuário ${usernameList[index]}`,
          products
        );
        savedData.push({
          user: usernameList[index],
          products,
        });
      }

      console.log("Dados salvos:", savedData);
      const mostExpensiveProduct = this.getMostExpensiveProduct(savedData);
      console.log("Produto mais caro:", mostExpensiveProduct);

      await browser.close();
      return { status: "success", mostExpensiveProduct };
    } catch (error) {
      console.error("Erro durante o scraping:", error);
      await browser.close();
      return { status: "error", message: error };
    }
  }

  private async getUsernameList(page: puppeteer.Page): Promise<string[]> {
    const loginCredentialsElement = await page.$("#login_credentials");
    const loginContent = await loginCredentialsElement?.evaluate(
      (el) => el?.innerHTML
    );
    const usernameList = loginContent
      ?.split("<br>")
      .map((s) => s.trim().replace("<h4>Accepted usernames are:</h4>", ""))
      .filter(Boolean);

    return usernameList ?? [];
  }

  private async getPassword(page: puppeteer.Page): Promise<string> {
    const passwordText = await page.$eval(".login_password", (el) =>
      el?.innerHTML?.replace("<h4>Password for all users:</h4>", "").trim()
    );
    return passwordText ?? "";
  }

  private async clickLinkByText(page: puppeteer.Page, text: string) {
    await page.evaluate((linkText) => {
      const links = Array.from(document.querySelectorAll("a"));
      const targetLink = links.find(
        (link) => link.textContent?.trim() === linkText
      );

      if (targetLink) {
        targetLink.click();
      }
    }, text);
  }

  private getMostExpensiveProduct(savedData: ISavedData[]) {
    const allProducts = savedData.flatMap((item) => item.products || []);
    return allProducts.reduce((prev, current) =>
      prev.price > current.price ? prev : current
    );
  }

  private async getProducts(
    browser: puppeteer.Browser,
    username: string,
    password: string
  ) {
    const page = await browser.newPage();
    await page.goto("https://www.saucedemo.com/", {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector(".login_wrapper-inner");
    console.log("Tentando login com o usuário:", username);

    await page.waitForSelector("#user-name");
    await page.type("#user-name", username);
    await page.waitForSelector("#password");
    await page.type("#password", password);
    await page.waitForSelector("#login-button");
    await page.click("#login-button");

    const errorContainer = await page.$(".error-message-container");
    const errorMessage = await errorContainer?.evaluate((el) =>
      el?.textContent?.trim()
    );
    if (
      errorMessage &&
      errorMessage == "Epic sadface: Sorry, this user has been locked out."
    ) {
      await page.close();
      return [];
    }
    console.log("Logado com sucesso com o usuário:", username);
    const products = await page?.$$eval(".inventory_item", (items) => {
      return items?.map((item) => {
        const name =
          item.querySelector(".inventory_item_name")?.textContent || "";
        const priceText =
          item.querySelector(".inventory_item_price")?.textContent || "0";
        const price = parseFloat(priceText.replace("$", ""));
        return { name, price };
      });
    });

    await page.waitForSelector("#react-burger-menu-btn");
    await page.click("#react-burger-menu-btn");
    await page.waitForSelector("#logout_sidebar_link", { visible: true });
    await this.clickLinkByText(page, "Logout");
    console.log(`Logout realizado para o usuário ${username}!`);
    await page.close();
    return products;
  }

  private async getLoginCredentials(browser: puppeteer.Browser) {
    const page = await browser.newPage();
    await page.goto("https://www.saucedemo.com/", {
      waitUntil: "networkidle2",
    });

    const usernameList = await this.getUsernameList(page);
    const password = await this.getPassword(page);
    await page.close();

    return { usernameList, password };
  }
}
