import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageResponse} from "../model/page.response.model";
import {environment} from "../../environments/environment";
import {Referendum} from "../model/referendum-models/referendum.model";
import {ReferendumQuestion} from "../model/referendum-models/referendum-question.model";
import {Question} from "../model/sociological-survey-models/question.model";

@Injectable({
  providedIn: 'root'
})
export class ReferendumService {

  constructor(private http: HttpClient) {}

  public searchReferendums(keyword: string, currentPage: number, pageSize: number): Observable<PageResponse<Referendum>> {
    return this.http.get<PageResponse<Referendum>>(`${environment.backendHost}/referendums?keyword=` + keyword + "&page=" + currentPage + "&size=" + pageSize);
  }

  public addReferendum(referendum: Referendum): Observable<any> {
    return this.http.post(`${environment.backendHost}/referendums`, referendum);
  }

  public getReferendumQuestion(referendumId: number): Observable<any>{
    return this.http.get<ReferendumQuestion>(`${environment.backendHost}/referendums/${referendumId}/referendum-question`);
  }

  public deleteReferendum(referendumId: number){
    return this.http.delete(`${environment.backendHost}/referendums/` + referendumId);
  }

  // public getReferendumResults(referendum: Referendum){
  //   return this.http.get(`${environment.backendHost}/results-referendum/${referendum.referendumId}/question/results`)
  //
  // }

  public getReferendum(referendumId: number): Observable<Referendum>{
    return this.http.get<Referendum>(`${environment.backendHost}/referendums/${referendumId}/referendum`);
  }

  subscribeVoterOnReferendum(referendumId: number, voterId: number | undefined) {
    const data = { referendumId, voterId };

    return this.http.post(`${environment.backendHost}/referendums/${referendumId}/subscribe-on/voters/${voterId}`, data);
  }

  voteForSelectedOption(referendumId: number, option: never): Observable<any> {
    return this.http.put(`${environment.backendHost}/referendums/${referendumId}/referendum-question/vote?option=${option}`, option);

  }
}
