import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {PageResponse} from "../model/page.response.model";
import {SociologicalSurvey} from "../model/sociological-survey-models/sociological-survey.model";
import {Question} from "../model/sociological-survey-models/question.model";

@Injectable({
  providedIn: 'root'
})
export class SociologicalSurveyService {

  constructor(private http: HttpClient) {
  }


  public searchSociologicalSurveys(keyword: string, currentPage: number, pageSize: number): Observable<PageResponse<SociologicalSurvey>> {
    return this.http.get<PageResponse<SociologicalSurvey>>(`${environment.backendHost}/sociological-surveys?keyword=` + keyword + "&page=" + currentPage + "&size=" + pageSize);
  }

  public deleteSociologicalSurvey(sociologicalSurveyId: number){
    return this.http.delete(`${environment.backendHost}/sociological-surveys/` + sociologicalSurveyId);
  }

  public addSociologicalSurvey(sociologicalSurvey: any): Observable<any> {
    return this.http.post(`${environment.backendHost}/sociological-surveys`, sociologicalSurvey);
  }

  public getSociologicalSurveyQuestions(sociologicalSurveyId: number): Observable<any>{
    return this.http.get<Question[]>(`${environment.backendHost}/sociological-surveys/${sociologicalSurveyId}/questions`);
  }

  public addQuestionToSociologicalSurvey(question:Question, sociologicalSurveyId: number){
    return this.http.put(`${environment.backendHost}/sociological-surveys/${sociologicalSurveyId}/questions`, question);
  }


  public subscribeVoterOnSociologicalSurvey(sociologicalSurveyId: number, voterId: number | undefined): any {
    const data = { sociologicalSurveyId, voterId };

    return this.http.post(`${environment.backendHost}/sociological-surveys/${sociologicalSurveyId}/subscribe-on/voter/${voterId}`, data);
  }

  public getSociologicalSurvey(sociologicalSurveyId:number):Observable<any>{
    return this.http.get<SociologicalSurvey>(`${environment.backendHost}/sociological-surveys/${sociologicalSurveyId}`);
  }

  voteForSelectedOption(sociologicalSurveyId: number, optionKey: string): Observable<any> {
    return this.http.put(`${environment.backendHost}/sociological-surveys/${sociologicalSurveyId}/questions/vote?optionKey=${optionKey}`, optionKey);
  }

}
