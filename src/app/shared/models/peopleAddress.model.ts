import { Address } from './address.model';

export class PeopleAddress extends Address {

  constructor(street: string, public appartment: String, city: string, state: string, country: string, zip: string = '') {
    super(street, city, state, country, zip);
  }
}
