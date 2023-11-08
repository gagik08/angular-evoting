import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {PageResponse} from "../model/page.response.model";
import {SociologicalSurvey} from "../model/sociological-survey.model";
import {Question} from "../model/question.model";

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

  public addQuestion(question: Question){
    this.http.post(`${environment.backendHost}/sociological-surveys/add-question`, question)
  }
}
