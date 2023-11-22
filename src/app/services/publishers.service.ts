import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {Publisher} from "../model/publisher.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PageResponse} from "../model/page.response.model";
import {Referendum} from "../model/referendum-models/referendum.model";
import {SociologicalSurvey} from "../model/sociological-survey-models/sociological-survey.model";

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  constructor(private http: HttpClient) {
  }


  public loadPublisherByUsername(username: string): Observable<Publisher> {
    return this.http.get<Publisher>(environment.backendHost + "/publishers/find?username=" + username)
      .pipe(
        catchError(error => {
          console.error('Error loading publisher:', error);
          throw error; // rethrow the error to propagate it to the subscriber
        })
      );  }

  public updatePublisher(publisher: Publisher, publisherId: number): Observable<Publisher> {
    return this.http.put<Publisher>(environment.backendHost + "/publishers/" + publisherId, publisher);
  }

  public getReferendumsByPublisherId(publisherId: number, currentPage: number, pageSize: number): Observable<PageResponse<Referendum>>{
    return this.http.get<PageResponse<Referendum>>(`${environment.backendHost}/publishers/${publisherId}/referendums?page=${currentPage}&size=${pageSize}`)
  }

  public getSociologicalSurveysByPublisherId(publisherId: number): Observable<PageResponse<SociologicalSurvey>>{
    return this.http.get<PageResponse<SociologicalSurvey>>(`${environment.backendHost}/publishers/${publisherId}/sociological-surveys`)
  }

  public getPublicationsByPublisherId(publisherId: number, currentPage: number, pageSize: number): Observable<PageResponse<any>>{
    return this.http.get<PageResponse<any>>(`${environment.backendHost}/publishers/${publisherId}/publications?page=${currentPage}&size=${pageSize}`)
  }

  searchPublishers(keyword: string, page: number, size: number): Observable<PageResponse<any>> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<any>>(`${environment.backendHost}/publishers`, { params });
  }

}
