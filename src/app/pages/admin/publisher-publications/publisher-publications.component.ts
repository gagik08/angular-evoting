import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {PublishersService} from "../../../services/publishers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageResponse} from "../../../model/page.response.model";
import {catchError, Observable, throwError} from "rxjs";
import {SociologicalSurvey} from "../../../model/sociological-survey-models/sociological-survey.model";
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import {ReferendumService} from "../../../services/referendum.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-publisher-publications',
  templateUrl: './publisher-publications.component.html',
  styleUrls: ['./publisher-publications.component.css']
})
export class PublisherPublicationsComponent implements OnInit {
  publisherId!: number;
  currentPage: number = 0;
  pageSize: number = 70;
  pagePublications$!: Observable<PageResponse<any>>;
  errorMessage: any;

  constructor(
    private authService: AuthService,
    private publisherService: PublishersService,
    private route: ActivatedRoute,
    private _router: Router,
    private sociologicalSurveyService: SociologicalSurveyService,
    private referendumService: ReferendumService
  ) {
  }

  ngOnInit(): void {
    this.publisherId = this.route.snapshot.params['publisherId'];
    this.handleSearchPublications();
  }

  handleSearchPublications() {
    this.pagePublications$ = this.publisherService.getPublicationsByPublisherId(
      this.publisherId,
      this.currentPage,
      this.pageSize
    ).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        console.log(this.errorMessage)
        return throwError(err);
      }));
  }

  getResultsRouterLink(publication: any) {
    if (this.isSociologicalSurvey(publication)) {
      this._router.navigateByUrl(`/results-sociological-survey/${publication.sociologicalSurveyId}/questions/results`)
    } else {
      this._router.navigateByUrl(`/results-referendum/${publication.referendumId}/referendum-question/results`)
    }
  }

  isSociologicalSurvey(subscription: any): boolean {
    return subscription.sociologicalSurveyId !== undefined;
  }

  handlePublicationDelete(publication: any ) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (this.isSociologicalSurvey(publication)) {
        if (result.isConfirmed) {
          this.sociologicalSurveyService.deleteSociologicalSurvey(publication.sociologicalSurveyId).subscribe({
            next: () => {
              Swal.fire({
                title: "Deleted!",
                text: "Your sociological survey has been deleted.",
                icon: "success"
              });
              this.handleSearchPublications();
            },
            error: err => {
              alert(err.message);
              console.log(err);
            }
          });
        }
      }
      else {
        if (result.isConfirmed){
          this.referendumService.deleteReferendum(publication.referendumId).subscribe({
            next: () => {
              Swal.fire({
                title: "Deleted!",
                text: "Your sociological survey has been deleted.",
                icon: "success"
              });
              this.handleSearchPublications();
            },
            error: err => {
              alert(err.message);
              console.log(err);
            }
          });
        }
      }
    });
  }
}
