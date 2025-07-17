export default class PageEndpoints {
  static readonly PublicEndpoints = class {
    static readonly HOME_ENDPOINT = '/home';
    static readonly LOGIN_ENDPOINT = '/login';
    static readonly SIGN_UP_ENDPOINT = '/sign-up';
  };

  static readonly ErrorEndpoints = class {
    static readonly PERMISSION_DENIED_ENDPOINT = '/403';
  };
}
