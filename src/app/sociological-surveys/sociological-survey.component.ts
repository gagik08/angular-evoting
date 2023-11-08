import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SociologicalSurveyService} from "../services/sociological-survey.service";
import {catchError, Observable, throwError} from "rxjs";
import {PageResponse} from "../model/page.response.model";
import {SociologicalSurvey} from "../model/sociological-survey.model";
import Swal from "sweetalert2";
import {Category} from "../model/category.model";
import {Publisher} from "../model/publisher.model";
import {Question} from "../model/question.model";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";

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
  pageSize: number = 5;
  errorMessage!: string;
  submitted: boolean = false;

  constructor(private modalService: NgbModal,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private sociologicalSurveyService: SociologicalSurveyService) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control('')
    });
    this.authService.user.subscribe((loggedUser)=>{
      this.sociologicalSurveyFormGroup = this.formBuilder.group({
        title: ["", Validators.required],
        description: ["", Validators.required],
        numberOfQuestions: ['', [Validators.required, this.rangeValidator(1, 5)]],
        category: ['Sociological Survey', Validators.required],
        publisher: [loggedUser?.publisher, Validators.required],
      })
      this.handleSearchSociologicalSurveys();
    })
  }


  getModal(content: any) {
    // this.modalService.open(content, {size: 'xl'})
    const modalRef: NgbModalRef = this.modalService.open(content, { size: 'xl' });

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
    this.pageSociologicalSurvey$ = this.sociologicalSurveyService.searchSociologicalSurveys(keyword, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchSociologicalSurveys();
  }

  // handleDeleteSociologicalSurvey(survey: SociologicalSurvey) {
  //   let conf = confirm("Are you sure?");
  //   if (!conf) return;
  //   this.sociologicalSurveyService.deleteSociologicalSurvey(survey.sociologicalSurveyId).subscribe({
  //     next: () => {
  //       this.handleSearchSociologicalSurveys();
  //     },
  //     error: err => {
  //       alert(err.message);
  //       console.log(err);
  //     }
  //   });
  // }

  handleDeleteSociologicalSurvey(survey: SociologicalSurvey) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.sociologicalSurveyService.deleteSociologicalSurvey(survey.sociologicalSurveyId).subscribe({
          next: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.handleSearchSociologicalSurveys();
          },
          error: err => {
            alert(err.message);
            console.log(err);
          }
        });
      }
    });
  }


  rangeValidator(min: number, max: number) {
    return (control: { value: any; }) => {
      const value = control.value;

      if (value === null || value === undefined || value === '') {
        return null; // Return null for empty values
      }

      const isValid = !isNaN(value) && value >= min && value <= max;
      return isValid ? null : { range: true };
    };
  }

  onCloseModal(modal: any) {

  }

  onSaveModal(modal: any) {

  }
}
