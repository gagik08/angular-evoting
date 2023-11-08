import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  public user={
    username: '',
    password: '',
    age: ''
  }

  ngOnInit(): void {
  }

  formSubmit() {
    // console.log(this.user);
    if (this.user.username=== '' || this.user.password=== null){
      alert('User is required');
      return;
    }

    this.userService.addUser(this.user).subscribe(
      data=> {
        // success
        console.log(data);
        alert('success');
      },
      error=> {
        // error
        console.log(error);
        alert('something went wrong');
      }
    );
  }
}
