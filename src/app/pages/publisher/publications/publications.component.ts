import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {PageResponse} from "../../../model/page.response.model";
import {PublishersService} from "../../../services/publishers.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Publisher} from "../../../model/publisher.model";
import {AuthService} from "../../../services/auth.service";
import {PageEvent} from "@angular/material/paginator";
import {SociologicalSurvey} from "../../../model/sociological-survey-models/sociological-survey.model";
import Swal from "sweetalert2";
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import {ReferendumService} from "../../../services/referendum.service";

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit{

  searchFormGroup!: FormGroup;
  pagePublications$!: Observable<PageResponse<any>>;
  currentPage: number = 0;
  pageSize: number = 5;
  currentPublisher!: Publisher;
  errorMessage!: string;
  canSubscribe: boolean = false;
  canDelete: boolean = false;

  constructor(private publisherService:PublishersService,
              private authService: AuthService,
              private _formBuilder: FormBuilder,
              private sociologicalSurveyService: SociologicalSurveyService,
              private referendumService: ReferendumService) {
  }


  ngOnInit(): void {
    this.searchFormGroup = this._formBuilder.group({
      keyword: this._formBuilder.control('')
    });
    this.authService.user.subscribe(
      (loggedUser) => {
        this.canSubscribe = 'Voter' === loggedUser?.roles[0];
        this.canDelete = "Commission Head" === loggedUser?.roles[0];
        this.currentPublisher = <Publisher>loggedUser?.publisher
      }
    );
    let currentPublisherId = this.currentPublisher.publisherId;
    this.handleSearchPublications();

  }


  handleSearchPublications() {

    this.pagePublications$ = this.publisherService.getPublicationsByPublisherId(this.currentPublisher.publisherId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        console.log(this.errorMessage)
        return throwError(err);
      })
    );
  }


  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchPublications();
  }

  getNext($event: PageEvent) {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.handleSearchPublications();
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

  isSociologicalSurvey(publication: any): boolean {
    return publication.referendumId === undefined;
  }

}
