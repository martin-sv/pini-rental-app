import { Property } from './property.model';
import { Guest } from './guest.model';

export class CheckIn {

  constructor(
    public idProperty: string,
    public guest: Guest,
    public checkingDateTime: Date,
    public checkoutDateTime: Date,
    public expensesPaid: boolean,
    public notes: string) {}
}
