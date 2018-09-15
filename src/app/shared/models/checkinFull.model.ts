import { CheckIn } from './checkIn.model';
import { Property } from './property.model';
import { Guest } from './guest.model';
import { PropertiesService } from '../../properties/properties.service';
import { Host } from './host.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CheckInFull extends CheckIn {
  public host: Host;
  public property: Property;

  constructor(
    public idCheckin: string,
    public idHost: string,
    public idProperty: string,
    public guest: Guest,
    public checkingDateTime: string,
    public checkoutDateTime: string,
    public expensesPaid: boolean,
    public notes: string = '') {

    super(idCheckin, idHost, idProperty, guest, checkingDateTime, checkoutDateTime, expensesPaid, notes);
  }
}
