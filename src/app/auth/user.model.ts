export class User {

  get idUSer(): number { return this._idUser; }

  constructor(public _idUser: number, public email: string) { }
}
