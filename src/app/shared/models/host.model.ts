import { Property } from './property.model';
import { PeopleAddress } from './peopleAddress.model';

export class Host {
 // get idHost() { return this._idHost; }

 constructor(
   public idHost: string,
   public firstName: string,
   public lastName: string,
   public phone: string,
   public email: string,
   public homeAddress: PeopleAddress,
   public propertyList: Property[] = []) {}

  public addProperty(property: Property): void {
    this.propertyList.push(property);
  }
}
