export class LocatorUtils {
    static generateLocator = (): string => {
      return Math.random().toString(36).substr(2, 6).toUpperCase();
    };
  }