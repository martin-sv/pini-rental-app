import { PropertyClassEnum } from './propertyClassEnum';
import { Host } from './host.model';
import { CheckInOut } from './checkInOut.model';
import { Cleaning } from './cleaning.model';
import { PeopleAddress } from './peopleAddress.model';
import { Condo } from './condo.model';

export class Property {
  get idProperty(): string { return this._idProperty; }
  public checkInOutHistory: CheckInOut[];
  public cleaningHistory: Cleaning[];

  constructor(
    private _idProperty: string,
    public host: Host,
    public name: string,
    public cover: string,
    public propertyClass: PropertyClassEnum,
    public serviceFee: number,
    public address: PeopleAddress,
    public condo?: Condo,
    checkInOutHistory?: CheckInOut[],
    cleaningHistory?: Cleaning[]) {

    this.checkInOutHistory = checkInOutHistory;
    this.cleaningHistory = cleaningHistory;
    host.addProperty(this);
    // host.propertyList.push(this);
  }

}
