import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {PageResponse} from "../model/page.response.model";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../services/auth.service";
import Swal from "sweetalert2";
import {Referendum} from "../model/referendum-models/referendum.model";
import {ReferendumService} from "../services/referendum.service";
import {Voter} from "../model/voter.model";

@Component({
  selector: 'app-referendums',
  templateUrl: './referendums.component.html',
  styleUrls: ['./referendums.component.css']
})
export class ReferendumsComponent {

  searchFormGroup!: FormGroup;
  pageReferendum$!: Observable<PageResponse<Referendum>>;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;
  submitted: boolean = false;
  isVoter: boolean = false;
  currentVoter!: Voter | undefined;
  isCommissionMember: boolean = false;

  constructor(private modalService: NgbModal,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private referendumService: ReferendumService) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control('')
    });
    this.authService.user.subscribe((loggedUser) => {
      this.isCommissionMember = loggedUser?.roles[0] === 'Commission Member';
      this.isVoter = loggedUser?.roles[0] === 'Voter';
      this.currentVoter = loggedUser?.voter;
      this.handleSearchReferendums();
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
  }

  handleSearchReferendums() {
    let keyword = this.searchFormGroup.value.keyword;
    this.pageReferendum$ = this.referendumService.searchReferendums(keyword, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchReferendums();
  }

  participate(referendumId: number){
    if (this.isVoter) {
      this.referendumService.subscribeVoterOnReferendum(referendumId, this.currentVoter?.voterId).subscribe(
        (data: any) => {
          console.log('Success:', data);
          Swal.fire('Success', 'You have subscribed successfully', 'success');
        },
        (error: any) => {
          console.error('Error:', error);
          Swal.fire('Error', 'Error in subscribe on referendum', 'error');
        }
      );
    }
  }

  delete(referendumId: number) {
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
          this.referendumService.deleteReferendum(referendumId).subscribe(
            () => {
              Swal.fire({
                title: 'Deleted!',
                text: 'The referendum has been deleted.',
                icon: 'success',
              });
              // Optionally, you can perform additional actions after successful deletion
            },
            (error: any) => {
              console.error('Error deleting referendum', error);
              Swal.fire({
                title: 'Error',
                text: 'An error occurred while deleting the referendum.',
                icon: 'error',
              });
            }
          );
        }
      });
    }
  }

}
