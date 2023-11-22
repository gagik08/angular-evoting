import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {PageResponse} from "../../../model/page.response.model";
import {Voter} from "../../../model/voter.model";
import {AuthService} from "../../../services/auth.service";
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import {ReferendumService} from "../../../services/referendum.service";
import {VoterService} from "../../../services/voter.service";
import {PageEvent} from "@angular/material/paginator";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ParticipationStatus} from "../../../model/ParticipationStatus";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  searchFormGroup!: FormGroup;
  pageSubscriptions$!: Observable<PageResponse<any>>;
  currentPage: number = 0;
  pageSize: number = 5;
  currentVoter!: Voter;
  errorMessage!: string;
  canSubscribe: boolean = false;
  canDelete: boolean = false;
  private participationStatuses: ParticipationStatus[] = [];

  constructor(private voterService: VoterService,
              private authService: AuthService,
              private _formBuilder: FormBuilder,
              private sociologicalSurveyService: SociologicalSurveyService,
              private referendumService: ReferendumService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this._formBuilder.group({
      keyword: this._formBuilder.control('')
    });
    this.authService.user.subscribe(
      (loggedUser) => {
        this.canSubscribe = 'Voter' === loggedUser?.roles[0];
        this.canDelete = "Commission Head" === loggedUser?.roles[0];
        this.currentVoter = <Voter>loggedUser?.voter;
      }
    );
    let currentVoterId = this.currentVoter.voterId;
    this.handleSearchSubscriptions();

  }

  handleSearchSubscriptions() {
    this.pageSubscriptions$ = this.voterService.getSubscriptionsByVoterId(this.currentVoter.voterId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        console.log(this.errorMessage)
        return throwError(err);
      })
    );
  }

  getNext($event: PageEvent) {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.handleSearchSubscriptions();
  }

  isSociologicalSurvey(subscription: any): boolean {
    return subscription.sociologicalSurveyId !== undefined;
  }


  async startVoting(subscription: any) {
    // Assuming voterId and subscriptionId are available
    const voterId = this.currentVoter.voterId;
    const subscriptionId = this.isSociologicalSurvey(subscription)
      ? subscription.sociologicalSurveyId
      : subscription.referendumId;

    const existingStatus = this.participationStatuses.find(
      (status) => status.voterId === voterId && status.subscriptionId === subscriptionId
    );

    if (!existingStatus || !existingStatus.hasParticipated) {
      if (this.isSociologicalSurvey(subscription)) {
        const result = await Swal.fire({
          title: 'Do you want to participate in the sociological survey?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
        });

        if (result.isConfirmed) {
          this.updateParticipationStatus(voterId, subscriptionId, true);
          this._router.navigate([`/start/${subscriptionId}/sociological-survey`]);
        } else if (result.isDenied) {
          this._router.navigate([this._router.url]);
        }
      } else {
        const result = await Swal.fire({
          title: 'Do you want to participate in the referendum?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
        });

        if (result.isConfirmed) {
          this.updateParticipationStatus(voterId, subscriptionId, true);
          this._router.navigate([`/start/${subscriptionId}/referendum`]);
        } else if (result.isDenied) {
          this._router.navigate([this._router.url]);
        }
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have already participated!',
      });
    }
  }


  hasParticipated(subscription: any): boolean {
    // Assuming voterId and subscriptionId are available
    const voterId = this.currentVoter.voterId;
    const subscriptionId = subscription.id; // Use the correct property for subscription ID

    const existingStatus = this.participationStatuses.find(
      (status) => status.voterId === voterId && status.subscriptionId === subscriptionId
    );

    if (existingStatus) {
      return existingStatus.hasParticipated;
    } else {
      return false;
    }
  }


  private updateParticipationStatus(voterId: number, subscriptionId: number, hasParticipated: boolean) {
    const existingStatusIndex = this.participationStatuses.findIndex(
      (status) => status.voterId === voterId && status.subscriptionId === subscriptionId
    );

    if (existingStatusIndex !== -1) {
      this.participationStatuses[existingStatusIndex].hasParticipated = hasParticipated;
    } else {
      const newStatus = new ParticipationStatus(voterId, subscriptionId, hasParticipated);
      this.participationStatuses.push(newStatus);
    }
  }


  getResultsRouterLink(subscription: any) {
    if (this.isSociologicalSurvey(subscription)){
      this._router.navigateByUrl(`/results-sociological-survey/${subscription.sociologicalSurveyId}/questions/results`)
    }else {
      this._router.navigateByUrl(`/results-referendum/${subscription.referendumId}/referendum-question/results`)
    }
  }
}
