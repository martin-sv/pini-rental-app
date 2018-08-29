import { Property } from './property';

export class Host {
  private _idHost: number;
  private _firstName: string;
  private _lastName: string;
  private _propertyList: Array<Property>;

  get idHost() { return this._idHost; }
  get firstName() { return this._firstName; }
  set firstName(newFirstName: string) { this._firstName = newFirstName; }
  get lastName() { return this._lastName; }
  set lastName(newLastName: string) { this._lastName = newLastName; }
  get propertyCount() { return this._propertyList.length; }

  constructor(idHost: number, firstName: string, lastName: string, propertyList: Array<Property> = null) {
    this._idHost = idHost;
    this._firstName = firstName;
    this._lastName = lastName;
    this._propertyList = propertyList;
  }
}
