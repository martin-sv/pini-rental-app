import { PropertyClassEnum } from './propertyClassEnum';
import { Host } from './host.model';
import { Cleaning } from './cleaning.model';
import { PeopleAddress } from './peopleAddress.model';
import { Condo } from './condo.model';
import { CheckIn } from './checkIn.model';

export class Property {
  // get idProperty(): string { return this._idProperty; }
  public checkInOutHistory: CheckIn[];
  public cleaningHistory: Cleaning[];

  constructor(
    public idProperty: string,
    public host: Host,
    public name: string,
    public cover: string,
    public propertyClass: PropertyClassEnum,
    public serviceFee: number,
    public address: PeopleAddress,
    public condo?: Condo,
    checkInOutHistory?: CheckIn[],
    cleaningHistory?: Cleaning[]) {

    this.checkInOutHistory = checkInOutHistory;
    this.cleaningHistory = cleaningHistory;
    host.addProperty(this);
    // host.propertyList.push(this);
  }

}
