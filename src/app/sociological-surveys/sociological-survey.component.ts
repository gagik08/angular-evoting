import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SociologicalSurveyService} from "../services/sociological-survey.service";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {PageResponse} from "../model/page.response.model";
import {SociologicalSurvey} from "../model/sociological-survey-models/sociological-survey.model";
import Swal from "sweetalert2";
import {AuthService} from "../services/auth.service";
import {PageEvent} from "@angular/material/paginator";
import {UserService} from "../services/user.service";
import {User} from "../model/user.model";
import {Voter} from "../model/voter.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sociological-surveys',
  templateUrl: './sociological-survey.component.html',
  styleUrls: ['./sociological-survey.component.css']
})
export class SociologicalSurveyComponent implements OnInit {
  searchFormGroup!: FormGroup;
  sociologicalSurveyFormGroup!: FormGroup;
  pageSociologicalSurvey$!: Observable<PageResponse<SociologicalSurvey>>;
  currentPage: number = 0;
  pageSize: number = 3;
  errorMessage!: string;
  submitted: boolean = false;
  isVoter: boolean = false;
  currentVoter!: Voter | undefined;
  isCommissionMember: boolean = false;

  constructor(private modalService: NgbModal,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private sociologicalSurveyService: SociologicalSurveyService,
              private userService: UserService,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control('')
    });
    this.authService.user.subscribe((loggedUser) => {
      this.isCommissionMember = loggedUser?.roles[0] === 'Commission Member';
      this.isVoter = loggedUser?.roles[0] === 'Voter';
      this.currentVoter = loggedUser?.voter;
      this.handleSearchSociologicalSurveys();
    })
  }


  getModal(content: any) {
    // this.modalService.open(content, {size: 'xl'})
    const modalRef: NgbModalRef = this.modalService.open(content, {size: 'xl'});

    // Optional: You can handle modal close events here
    modalRef.result.then(
      (result) => {
        console.log(`Modal closed with result: ${result}`);
      },
      (reason) => {
        console.log(`Modal dismissed with reason: ${reason}`);
      }
    );
    // this.modalService.open(content, {size: 'l'});
  }

  handleSearchSociologicalSurveys() {
    let keyword = this.searchFormGroup.value.keyword;
    this.sociologicalSurveyService
      .searchSociologicalSurveys(keyword, this.currentPage, this.pageSize)
      .pipe(
        catchError((err) => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      )
      .subscribe((pageResponse: PageResponse<SociologicalSurvey>) => {
        this.pageSociologicalSurvey$ = of(pageResponse);
      });
  }


  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchSociologicalSurveys();
  }




  getRole(username: any): Observable<string> {
    return this.userService.getUserRole(username).pipe(
      map((userRole: string) => {
        return userRole;
      })
    );
  }


  getNext($event: PageEvent) {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.handleSearchSociologicalSurveys();
  }

  participate(sociologicalSurveyId: number){
    if (this.isVoter) {
      this.sociologicalSurveyService.subscribeVoterOnSociologicalSurvey(sociologicalSurveyId, this.currentVoter?.voterId).subscribe(
        (data: any) => {
          console.log('Success:', data);
          Swal.fire('Success', 'You have subscribed successfully', 'success');
        },
        (error: any) => {
          console.error('Error:', error);
          Swal.fire('Error', 'Error in subscribe on sociological survey', 'error');
        }
      );
    }
  }

  delete(sociologicalSurveyId: number) {
    if (this.isCommissionMember) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sociologicalSurveyService.deleteSociologicalSurvey(sociologicalSurveyId).subscribe(
            () => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Sociological Survey has been deleted.',
                icon: 'success',
              });
              // Optionally, you can perform additional actions after successful deletion
            },
            (error: any) => {
              console.error('Error deleting Sociological Survey', error);
              Swal.fire({
                title: 'Error',
                text: 'An error occurred while deleting the Sociological Survey.',
                icon: 'error',
              });
            }
          );
        }
      });
    }
  }


}

// rangeValidator(min: number, max: number) {
//   return (control: { value: any; }) => {
//     const value = control.value;
//
//     if (value === null || value === undefined || value === '') {
//       return null; // Return null for empty values
//     }
//
//     const isValid = !isNaN(value) && value >= min && value <= max;
//     return isValid ? null : { range: true };
//   };
// }

