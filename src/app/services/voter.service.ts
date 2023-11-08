import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Voter} from "../model/voter.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(private http: HttpClient) { }


  public loadVoterByUsername(username: string): Observable<Voter>{
    return this.http.get<Voter>(environment.backendHost+"/voters/find?username="+username);
  }

  public updateVoter(voter: Voter, voterId: number): Observable<Voter> {
    return this.http.put<Voter>(environment.backendHost + "/voters/" + voterId, voter);
  }
}
