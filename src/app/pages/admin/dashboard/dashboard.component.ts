import {Component, OnInit} from '@angular/core';
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import {ReferendumService} from "../../../services/referendum.service";
import {AuthService} from "../../../services/auth.service";
import {catchError, Observable, of, throwError} from "rxjs";
import {PageResponse} from "../../../model/page.response.model";
import {SociologicalSurvey} from "../../../model/sociological-survey-models/sociological-survey.model";
import {Voter} from "../../../model/voter.model";
import {Publisher} from "../../../model/publisher.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {VoterService} from "../../../services/voter.service";
import {PublishersService} from "../../../services/publishers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  searchFormGroup!: FormGroup;
  pageVoters$!: Observable<PageResponse<Voter>>;
  pagePublishers$!: Observable<PageResponse<Publisher>>;
  currentPage: number = 0;
  pageSize: number = 70;
  errorMessage!: string;

  constructor(private voterService: VoterService,
              private publisherService: PublishersService,
              private authService: AuthService,
              private _formBuilder: FormBuilder,
              private _router: Router
              ) {
  }


  ngOnInit(): void {
    this.searchFormGroup = this._formBuilder.group({
      keyword: [''] // Default value can be set here if needed
    });
    this.handleSearchVoters();
    this.handleSearchPublishers();
  }

  private handleSearchVoters() {
    let keyword = this.searchFormGroup.value.keyword;
    this.voterService
      .searchVoters(keyword, this.currentPage, this.pageSize)
      .pipe(
        catchError((err) => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      )
      .subscribe((pageResponse: PageResponse<Voter>) => {
        this.pageVoters$ = of(pageResponse);
      });
  }

  private handleSearchPublishers() {
    let keyword = this.searchFormGroup.value.keyword;
    this.publisherService
      .searchPublishers(keyword, this.currentPage, this.pageSize)
      .pipe(
        catchError((err) => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      )
      .subscribe((pageResponse: PageResponse<Publisher>) => {
        this.pagePublishers$ = of(pageResponse);
      });
  }

  seeAllPublications(publisherId: number) {
    return this._router.navigateByUrl(`voting-items/${publisherId}/publisher-publications`)
  }

  seeAllSubscriptions(voterId: number) {
    return this._router.navigateByUrl(`voting-items/${voterId}/voter-subscriptions`)

  }
}
