import { Property } from './property.model';
import { Time } from '@angular/common';

export class CheckInOut {

  constructor(property: Property, guest: String, checkInDate: Date, checkInTime: Time, checkOutDate: Date, checkOutTime: Time) {}
}
