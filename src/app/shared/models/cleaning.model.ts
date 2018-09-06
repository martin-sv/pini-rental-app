import { Property } from './property.model';
import { Time } from '@angular/common';

export class Cleaning {

  constructor(
    public property: Property,
    public cleaner: string,
    public date: Date,
    public time: Time) {}
}
