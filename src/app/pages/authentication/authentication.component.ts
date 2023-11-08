import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginFormGroup!: FormGroup;
  submitted: boolean = false;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  onLogin() {
    this.submitted = true;

    if (this.loginFormGroup.invalid) {
      this.snack.open('Please fill in all required fields', 'OK', {
        duration: 3000,
      });
      return;
    }
    this.authService.login(this.loginFormGroup.value).subscribe({
      next: (loginResponse) => {
        this.authService.saveToken(loginResponse);
      },
      error: err => {
        this.errorMessage = err;
        console.log("Something goes wrong!" + this.errorMessage)
      }
    })
  }

}
