export default class PageEndpoints {
  static readonly PublicEndpoints = class {
    static readonly HOME_ENDPOINT = '/home';
    static readonly LOGIN_ENDPOINT = '/login';
    static readonly SIGN_UP_ENDPOINT = '/sign-up';
    static readonly CREATE_BLOOD_DONATION = '/blood-donation/create';
  };

  static readonly PrivateEndpoints = class {
    static readonly CREATE_BLOOD_DONATION = '/blood-donation/create';
    static readonly GET_BLOOD_TYPE = '/get-blood-type';
    static readonly SUBMIT_CERTIFICATE = '/submit-certificate'
  };
  
  static readonly ErrorEndpoints = class {
    static readonly PERMISSION_DENIED_ENDPOINT = '/403';
  };
}
