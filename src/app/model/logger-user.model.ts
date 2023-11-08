import {Voter} from "./voter.model";
import {Publisher} from "./publisher.model";

export class LoggedUser{
  constructor(public username: string,
              public roles: string[],
              private _token: string,
              public _expiration: Date,
              public voter: Voter | undefined,
              public publisher: Publisher | undefined) {
  }

  get token(){
    if (!this._expiration || new Date() > this._expiration){
      return null;
    }
    return this._token;
  }



}
