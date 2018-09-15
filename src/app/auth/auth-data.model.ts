import { UserRolesEnum } from './userRolesEnum';

export class AuthData {
  constructor(
    public email: string,
    public password: string,
    public role: UserRolesEnum = UserRolesEnum.ANONYMOUS) { }
}
