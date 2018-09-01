import { Host } from './host.model';
import { Property } from './property.model';


export class DataMock {
  static _host: Host;
  static _properties: Property[] = [];
  static get host() { return Object.create(this._host); }
  static get properties() { return Object.create(this._properties); }

  private constructor() {}

  static generateHost(): Host {
    // this._host = new Host(this.rndNum().toString(), this.rndText(), this.rndText());
    return this._host;
  }

  static generateProperties(host: Host, propertyCount: number = 1) {
    const properties: Property[] = [];
    for (let i = 0; i < propertyCount; i++) {
    const property: Property = new Property(
      this.rndNum().toString(), host, this.rndText(), Math.round(Math.random()), this.rndText(), this.rndNum(), this.getPropertyImage());
      properties.push(property);
    }
    this._properties.push(...properties);
    return this.properties;
  }

  static generateProperty(host: Host) {
    this.generateProperties(host);
    return this.properties[this.properties.length - 1];
  }

  private static rndText(length: number = 7): string {
    let returnText = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      returnText += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return returnText;
  }

  private static rndNum(max: number = 1000, min: number = 1): number {
    return (Math.floor(Math.random() * max) + min);
  }

  private static getPropertyImage() {
    const images = [
    'https://preview.ibb.co/iufwa9/property0.jpg',
    'https://preview.ibb.co/czVwa9/property1.png',
    'https://image.ibb.co/htUpv9/property2.jpg',
    'https://image.ibb.co/cmcba9/property3.jpg',
    'https://image.ibb.co/cQ2L2p/property4.jpg',
    'https://preview.ibb.co/ngNyoU/property5.jpg',
    'https://preview.ibb.co/mU1DNp/property6.jpg',
    'https://image.ibb.co/niuYNp/property7.jpg',
    'https://preview.ibb.co/juwf2p/property8.jpg',
    'https://preview.ibb.co/cOiShp/property9.jpg',
    ];

    return images[this.rndNum(9, 1)];

  }

}


