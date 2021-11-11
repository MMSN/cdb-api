class TokenModel {
  public appName: string;

  public token: string;

  constructor(appName: string, token: string) {
    this.appName = appName;
    this.token = token;
  }
}

export default TokenModel;
