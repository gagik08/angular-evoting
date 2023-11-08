import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Publisher} from "../model/publisher.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  constructor(private http: HttpClient) {
  }


  public loadPublisherByUsername(username: string): Observable<Publisher> {
    return this.http.get<Publisher>(environment.backendHost + "/publishers/find?username=" + username);
  }

  public updatePublisher(publisher: Publisher, publisherId: number): Observable<Publisher> {
    return this.http.put<Publisher>(environment.backendHost + "/publishers/" + publisherId, publisher);
  }

}
