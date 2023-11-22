import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormArray, AbstractControl, ValidationErrors} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Publisher } from '../../model/publisher.model';
import { Voter } from '../../model/voter.model';
import {User} from "../../model/user.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupFormGroup!: FormGroup;
  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private _formBuilder: FormBuilder,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupFormGroup = this._formBuilder.group({
      userId: [0],
      username: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', [Validators.required, ageValidator]],
      userRole: ['', Validators.required],
      fullName: [''],
      publicName: [''],
      founder: ['']
    });
  }

  get userData(): FormArray {
    return this.signupFormGroup.get('userData') as FormArray;
  }

  get f() {
    return this.signupFormGroup.controls;
  }

  formSubmit() {
    this.submitted = true;

    if (this.signupFormGroup.invalid) {
      this.snack.open('Please fill in all required fields', 'OK', { duration: 3000 });
      return;
    }

    const userValue: any = this.signupFormGroup.value;

    // Check age validity
    if (this.signupFormGroup.hasError('invalidAge', ['age'])) {
      Swal.fire('Error', 'Age must be 18 or older', 'error');
      return;
    }

    const userData: User = {
      userId: 0,
      username: userValue.username,
      password: userValue.password,
      age: userValue.age,
      userRole: userValue.userRole
    };

    if (userValue.userRole === 'Publisher') {
      const publisherData: Publisher = {
        publicName: userValue.publicName,
        founder: userValue.founder,
        user: userData
      } as Publisher;

      this.userService.createPublisher(publisherData).subscribe(
        (data: any) => {
          console.log('Success:', data);
          Swal.fire('Success', 'User is created successfully', 'success');
        },
        (error) => {
          console.error('Error:', error);
          Swal.fire('Error', 'User with such username already exists', 'error');
        }
      );
    } else if (userValue.userRole === 'Voter') {

      const voterData = {
        fullName: userValue.fullName,
        user: userData
      } as Voter;

      this.userService.createVoter(voterData).subscribe(
        (data: any) => {
          console.log('Success:', data);
          Swal.fire('Success', 'User is created successfully', 'success');
        },
        (error) => {
          console.error('Error:', error);
          Swal.fire('Error', 'User with such username already exists', 'error');
        }
      );
    }
  }




  get getUserData() {
    return this.signupFormGroup.get('userData') as FormArray;
  }


  onChangeRole($event: Event) {
    const selectedRole = ($event.target as HTMLSelectElement).value;
    this.userData.clear();

    if (selectedRole === 'Publisher') {
      this.userData.push(this.createPublisherFormGroup());
    } else if (selectedRole === 'Voter') {
      this.userData.push(this.createVoterFormGroup());
    }
  }


  createPublisherFormGroup(): FormGroup {
    return this._formBuilder.group({
      publicName: ['', Validators.required],
      history: ['', Validators.required]
    });
  }

  createVoterFormGroup(): FormGroup {
    return this._formBuilder.group({
      fullName: ['', Validators.required]
    });
  }


}

function ageValidator(control: AbstractControl): ValidationErrors | null {
  const age = control.value;

  if (age && age < 18) {
    return { 'invalidAge': true };
  }

  return null;
}



