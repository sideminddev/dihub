export interface UserProps {
  id: string;
  username: string;
  password: string;
  createdAt?: Date;
}

export class UserEntity {
  public readonly props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }
}
