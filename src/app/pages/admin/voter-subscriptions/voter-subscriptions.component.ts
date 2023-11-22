import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {VoterService} from "../../../services/voter.service";
import {FormGroup} from "@angular/forms";
import {catchError, Observable, Subscription, throwError} from "rxjs";
import {PageResponse} from "../../../model/page.response.model";
import {Voter} from "../../../model/voter.model";
import {Publisher} from "../../../model/publisher.model";
import {PublishersService} from "../../../services/publishers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-voter-subscriptions',
  templateUrl: './voter-subscriptions.component.html',
  styleUrls: ['./voter-subscriptions.component.css']
})
export class VoterSubscriptionsComponent implements OnInit{
  voterId!: number;
  currentPage: number = 0;
  pageSize: number = 70;
  pageSubscriptions$!: Observable<PageResponse<any>>;
  errorMessage: any;

  constructor(
    private authService: AuthService,
    private voterService: VoterService,
    private route: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.voterId = this.route.snapshot.params['voterId'];
    this.handleSearchPublications();
  }

  handleSearchPublications() {
    this.pageSubscriptions$ = this.voterService.getSubscriptionsByVoterId(
      this.voterId,
      this.currentPage,
      this.pageSize
    ).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        console.log(this.errorMessage)
        return throwError(err);
      }));
  }

  getResultsRouterLink(subscription: any) {
    if (this.isSociologicalSurvey(subscription)) {
      this._router.navigateByUrl(`/results-sociological-survey/${subscription.sociologicalSurveyId}/questions/results`)
    } else {
      this._router.navigateByUrl(`/results-referendum/${subscription.referendumId}/referendum-question/results`)
    }
  }

  isSociologicalSurvey(subscription: any): boolean {
    return subscription.sociologicalSurveyId !== undefined;
  }
}
