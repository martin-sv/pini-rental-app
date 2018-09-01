import { Address } from './address.model';

export class Condo {

  public get idCondo() { return this._idCondo; }

  constructor(private _idCondo: string, public name: string, public address: Address, public phone: string, condoNotes: string = '') {}
}
