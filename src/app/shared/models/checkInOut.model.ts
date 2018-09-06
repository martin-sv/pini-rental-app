import { Property } from './property.model';
import { Guest } from './guest.model';

export class CheckInOut {

  constructor(
    public property: Property,
    public guest: Guest,
    public checkingDateTime: Date,
    public checkoutDateTime: Date,
    public expensesPaid: boolean,
    public specialRequirements: string) {}
}
