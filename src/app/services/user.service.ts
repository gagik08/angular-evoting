import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable, Subscription} from "rxjs";
import {Voter} from "../model/voter.model";
import {User} from "../model/user.model";
import {Publisher} from "../model/publisher.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {

  }


  public createUser(user: User) {
    return this.http.post(environment.backendHost + "/users/register", user)
  }

  public createVoter(voter: Voter) {
    return this.http.post(environment.backendHost + "/voters/register", voter)
  }

  public createPublisher(publisher: Publisher) {
    return this.http.post(environment.backendHost + "/publishers/register", publisher)
  }

  getUserRole(username: string): Observable<string> {
    return this.http.get<string>(`${environment.backendHost}/users/role-name?username=${username}`);
  }

}
