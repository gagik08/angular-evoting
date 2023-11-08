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
  publicName!: string | undefined;
  firstName!: string | undefined;
  lastname!: string | undefined;
  currentPublisher!: Publisher | undefined;
  currentVoter!: Voter | undefined;
  updatePublisherFormGroup!: FormGroup;
  updateVoterFormGroup!: FormGroup;

  submitted: boolean = false;

  isVoter = false;
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
          this.firstName = loggedUser?.voter?.firstName;
          this.lastname = loggedUser?.voter?.lastName;
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
        history: [this.currentPublisher?.history, Validators.required],
      })
    }
    else if (this.isVoter) {
      this.updateVoterFormGroup = this.formBuilder.group({
        voterId: [this.currentVoter?.voterId, Validators.required],
        firstName: [this.currentVoter?.firstName, Validators.required],
        lastName: [this.currentVoter?.lastName, Validators.required],
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
        alert("Success updating Profile");
        this.authService.refreshPublisher(publisher);
        this.submitted = false;
        modal.close();
      }, error: err => {
        alert(err.message)
      }
    });
  }


  onUpdateVoter(modal: any) {
    this.submitted = true;
    if (this.updateVoterFormGroup.invalid) return;
    this.voterService.updateVoter(this.updateVoterFormGroup.value, this.updateVoterFormGroup.value.voterId).subscribe({
      next: (voter) => {
        alert("Success updating Profile");
        this.authService.refreshVoter(voter);
        this.submitted = false;
        modal.close();
      }, error: err => {
        alert(err.message)
        console.log(err);
      }
    });
  }
}
