import { PropertyClassEnum } from './propertyClassEnum';
import { Host } from './host.model';
import { PropertyAddress } from './propertyAddress.model';
import { CheckInOut } from './checkInOut.model';
import { Cleaning } from './cleaning.model';

export class Property {
  get idProperty(): string { return this._idProperty; }

  constructor(
    private _idProperty: string,
    public host: Host,
    public name: string,
    public cover: string,
    public propertyClass: PropertyClassEnum,
    public address: PropertyAddress,
    public serviceFee: number,
    public checkInOutHistory?: CheckInOut[],
    public cleaningHistory?: Cleaning[]) {

    host.addProperty(this);
    // host.propertyList.push(this);
  }
}
