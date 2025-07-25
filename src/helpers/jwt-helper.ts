import { jwtDecode } from "jwt-decode";

export class JWTHelper {
  static decodeToken<T = any>(token: string): T {
    return jwtDecode<T>(token);
  }
}