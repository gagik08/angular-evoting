import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Subscription} from "rxjs";
import {Voter} from "../model/voter.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {

  }


  public addUser(user: any) {
    return this.http.post(environment.backendHost + "/users/", user)
  }

}
