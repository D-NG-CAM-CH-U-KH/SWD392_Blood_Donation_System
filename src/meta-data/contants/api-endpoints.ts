export default class ApiEndPoints {
  static readonly ROOT_ENDPOINT = '/api';
  static readonly API_VERSION = '/v1';
  static readonly API_ENDPOINT = `${this.ROOT_ENDPOINT}${this.API_VERSION}`;

  static readonly AuthEndpoints = class {
    static readonly AUTH_ENDPOINT = `${ApiEndPoints.API_ENDPOINT}/auth`;
    static readonly LOGIN_ENDPOINT = `${this.AUTH_ENDPOINT}/login`;
  };

  static readonly AccountEndpoints = class {
    static readonly ACCOUNT_ENDPOINT = `${ApiEndPoints.API_ENDPOINT}/account`;
    static readonly GET_ACCOUNT_ENDPOINT = this.ACCOUNT_ENDPOINT;
    static readonly GET_CURRENT_ACCOUNT_ENDPOINT = `${this.ACCOUNT_ENDPOINT}/current`;
    static readonly GET_MANY_ACCOUNTS_ENDPOINT = `${this.ACCOUNT_ENDPOINT}/many`;
    static readonly GET_ACCOUNT_BY_ID_ENDPOINT = `${this.ACCOUNT_ENDPOINT}/{id}`;
    static readonly CREATE_ACCOUNT_ENDPOINT = this.ACCOUNT_ENDPOINT;
    static readonly UPDATE_ACCOUNT_ENDPOINT = `${this.ACCOUNT_ENDPOINT}/{id}`;
    static readonly DELETE_ACCOUNT_ENDPOINT = `${this.ACCOUNT_ENDPOINT}/{id}`;

    static readonly CREATE_ACCOUNT_WITH_CITIZEN_CARD_ENDPOINT = `${this.ACCOUNT_ENDPOINT}/create-with-citizen-card`;
  };
}
