import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Voter} from "../model/voter.model";
import {environment} from "../../environments/environment";
import {PageResponse} from "../model/page.response.model";

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

  getSubscriptionsByVoterId(voterId: number, currentPage: number, pageSize: number) {
    return this.http.get<PageResponse<any>>(`${environment.backendHost}/voters/${voterId}/subscriptions?page=${currentPage}&size=${pageSize}`)
  }


  searchVoters(keyword: string, page: number, size: number): Observable<PageResponse<any>> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<any>>(`${environment.backendHost}/voters`, { params });
  }
}
