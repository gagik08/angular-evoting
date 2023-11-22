import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../services/auth.service";
import {LoggedUser} from "../model/logger-user.model";
import {Publisher} from "../model/publisher.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PublishersService} from "../services/publishers.service";
import {Voter} from "../model/voter.model";
import {VoterService} from "../services/voter.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userSub!: Subscription;
  isAuthenticated = false;
  isAdmin = false;
  isPublisher = false;
  publisherId: number | undefined;
  isVoter = false;
  publicName!: string | undefined;
  fullName!: string | undefined;
  currentPublisher!: Publisher | undefined;
  currentVoter!: Voter | undefined;
  updatePublisherFormGroup!: FormGroup;
  updateVoterFormGroup!: FormGroup;

  submitted: boolean = false;

  voterId: number | undefined;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private publisherService: PublishersService,
              private voterService: VoterService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      loggedUser => {
        this.isAuthenticated = !!loggedUser;
        if (!this.isAuthenticated) {
          this.initializeState();
        } else if (!!loggedUser) {
          this.setRole(loggedUser);
        }

        this.isPublisher = !!loggedUser?.publisher;
        this.isVoter = !!loggedUser?.voter;
        if (this.isPublisher) {
          this.publicName = loggedUser?.publisher?.publicName;
          this.currentPublisher = loggedUser?.publisher;
        }
        else if (this.isVoter) {
          this.fullName = loggedUser?.voter?.fullName;
          this.currentVoter = loggedUser?.voter;
        }
      }
    )
  }

  setRole(loggedUser: LoggedUser | null) {
    if (loggedUser?.roles.includes("Commission Member")) this.isAdmin = true;
    else if (!!loggedUser?.publisher) {
      this.isPublisher = true;
      this.publisherId = loggedUser.publisher?.publisherId;
    } else if (!!loggedUser?.voter) {
      this.isVoter = true;
      this.voterId = loggedUser.voter?.voterId;
    }


  }

  private initializeState() {
    this.isAdmin = false;
    this.isPublisher = false;
    this.isVoter = false;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  getModal(content: any) {
    this.modalService.open(content, {size: 'xl'});
    if (this.isPublisher) {
      this.updatePublisherFormGroup = this.formBuilder.group({
        publisherId: [this.currentPublisher?.publisherId, Validators.required],
        publicName: [this.currentPublisher?.publicName, Validators.required],
        history: [this.currentPublisher?.founder, Validators.required],
      })
    }
    else if (this.isVoter) {
      this.updateVoterFormGroup = this.formBuilder.group({
        voterId: [this.currentVoter?.voterId, Validators.required],
        fullName: [this.currentVoter?.fullName, Validators.required],
      })
    }
  }

  onCloseModal(modal: any) {
    modal.close();
  }

  onUpdatePublisher(modal: any) {
    this.submitted = true;
    if (this.updatePublisherFormGroup.invalid) return;
    this.publisherService.updatePublisher(this.updatePublisherFormGroup.value, this.updatePublisherFormGroup.value.publisherId).subscribe({
      next: (publisher) => {
        console.log('Success');
        Swal.fire('Success', 'Data is updated successfully', 'success');
        this.authService.refreshPublisher(publisher);
        this.submitted = false;
        this.onCloseModal(modal);
        }, error: err => {
        console.error('Error:');
        Swal.fire('Error', 'Something goes wrong, try again later', 'error');
      }
    });
  }


  onUpdateVoter(modal: any) {
    this.submitted = true;
    if (this.updateVoterFormGroup.invalid) return;
    this.voterService.updateVoter(this.updateVoterFormGroup.value, this.updateVoterFormGroup.value.voterId).subscribe({
      next: (voter) => {
        console.log('Success');
        Swal.fire('Success', 'Personal data is updated successfully', 'success');
        this.authService.refreshVoter(voter);
        this.submitted = false;
        this.onCloseModal(modal);
      }, error: err => {
        console.error('Error:');
        Swal.fire('Error', 'Something goes wrong, try again later', 'error');
      }
    });
  }
}
