import { Property } from './property.model';
import { Time } from '@angular/common';

export class Cleaning {

  constructor(
    public idCleaning: string,
    public idHost: string,
    public idProperty: string,
    public cleaner: string,
    public date: Date) {}
}
