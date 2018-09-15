import { CheckIn } from './checkIn.model';
import { Property } from './property.model';
import { Host } from '@angular/core';
import { Guest } from './guest.model';
import { PropertiesService } from '../../properties/properties.service';

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
    public notes: string = '',
    private propertiesService: PropertiesService) {

    super(idCheckin, idHost, idProperty, guest, checkingDateTime, checkoutDateTime, expensesPaid, notes);
    this.propertiesService.getHostByID(idHost).then((host: Host) => this.host = host);
    this.propertiesService.getPropertyByID(idProperty).then((property: Property) => this.property = property);
  }
}
