import { Address } from './address.model';
import { Condo } from './condo.model';

export class PropertyAddress {
  constructor (public address: Address, public condo?: Condo) {}
}
