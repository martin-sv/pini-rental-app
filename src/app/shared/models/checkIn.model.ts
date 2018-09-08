import { Property } from './property.model';
import { Guest } from './guest.model';

export class CheckIn {
  // get idCheckin(): string { return this._idCheckin; }

  constructor(
    public idCheckin: string,
    public idHost: string,
    public idProperty: string,
    public guest: Guest,
    public checkingDateTime: string,
    public checkoutDateTime: string,
    public expensesPaid: boolean,
    public notes: string = '') {}
}
