import { Host } from './Host';
import { Property } from './property';

export class DataMock {
  public generateHost(): Host {
    return new Host(this.rndNum(), this.rndText(), this.rndText());
  }

  public generateProperties(host: Host, propertyCount: number = 1) {
    const properties: Array<Property> = new Array<Property>();
    for (let i = 0; i < propertyCount; i++) {
    const property: Property = new Property(
      this.rndNum(), host, this.rndText(), this.rndNum(1), this.rndText(), this.rndNum(), this.rndText());
      properties.push(property);
    }
    return properties;
  }

  private rndText(length: number = 7): string {
    let returnText = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      returnText += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return returnText;
  }

  private rndNum(max: number = 1000, min: number = 1): number {
    return (Math.floor(Math.random() * max) + min);
  }

}

