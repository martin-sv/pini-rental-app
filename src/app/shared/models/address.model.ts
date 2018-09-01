export class Address {

  constructor(
    public street: string,
    public appartment: string,
    public city: string,
    public state: string,
    public country: string,
    public zip: string = '') {}
}
