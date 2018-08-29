import { PropertyClass } from './PropertyClass';
import { Host } from './Host';

export class Property {
  private _idProperty: number;
  private _host: Host;
  private _name: string;
  private _propertyClass: PropertyClass;
  private _address: string;
  private _checkinFee: number;
  private _picture: string;

  get idProperty(): number { return this._idProperty; }
  get host(): Host { return this._host; }
  set host(newHost: Host) { this._host = newHost; }
  get name(): string { return this._name; }
  set name(newName: string) { this._name = newName; }
  get propertyClass(): PropertyClass { return this._propertyClass; }
  set propertyClass(newPropertyClass: PropertyClass) { this._propertyClass = newPropertyClass; }
  get address(): string { return this._address; }
  set address(newAddress: string) { this._address = newAddress; }
  get checkinFee(): number { return this._checkinFee; }
  set checkinFee(newCheckinFee: number) { this._checkinFee = newCheckinFee; }
  get picture(): string { return this._picture; }
  set picture(newPicture: string) { this._picture = newPicture; }

  constructor(idProperty: number, host: Host, name: string, propertyClass: PropertyClass,
              address: string, checkinFee: number, picture: string) {
    this._idProperty = idProperty;
    this._host = host;
    this._name = name;
    this._propertyClass = propertyClass;
    this._address = address;
    this._checkinFee = checkinFee;
    this._picture = picture;
  }
}
