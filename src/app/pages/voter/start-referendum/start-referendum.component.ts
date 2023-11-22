// start-referendum.component.ts

import {Component} from '@angular/core';
import {ReferendumService} from '../../../services/referendum.service';
import {Referendum} from '../../../model/referendum-models/referendum.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-referendum',
  templateUrl: './start-referendum.component.html',
  styleUrls: ['./start-referendum.component.css']
})
export class StartReferendumComponent {
  referendumId!: number;
  referendum!: Referendum;
  errorMessage!: string;
  selectedOption: undefined;
  currentVoterId!: number | undefined;


  constructor(
    private _route: ActivatedRoute,
    private referendumService: ReferendumService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe(
      (loggedUser) => {
        this.currentVoterId = loggedUser?.voter?.voterId;
      }
    );
    this.referendumId = this._route.snapshot.params['subscriptionId'];
    this.loadReferendum();
  }

  loadReferendum() {
    this.referendumService.getReferendum(this.referendumId).subscribe(
      (data: Referendum) => {
        this.referendum = data;
        console.log(this.referendum.referendumQuestion);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  private showSuccessPopupAndRedirect() {
    Swal.fire({
      title: 'Voting Successful!',
      text: 'Thank you for participating in the referendum.',
      icon: 'success',
    }).then(() => {
      this.router.navigate([`/subscriptions/${this.currentVoterId}`]);
    });
  }

  voteForSelectedOption() {
    if (this.selectedOption) {
      this.referendumService.voteForSelectedOption(
        this.referendumId,
        this.selectedOption
      ).subscribe(
        (response: any) => {
          console.log('Response from server:', response);
          this.showSuccessPopupAndRedirect();
        },
        (error: any) => {
          console.error('Error incrementing value', error);
          this.showSuccessPopupAndRedirect();
        }
      );
    }
  }
}
