import { AuthData } from './auth-data.model';

export class AuthDataStatic {
  static authData: AuthData;

  private constructor() {}

  static setAuthData(authData: AuthData) {
    this.authData = authData;
  }

  static clearAuthData() {
    this.authData = null;
  }
}
