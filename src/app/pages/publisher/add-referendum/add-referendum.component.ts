import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import Swal from "sweetalert2";
import {ReferendumQuestion} from "../../../model/referendum-models/referendum-question.model";
import {ReferendumService} from "../../../services/referendum.service";

@Component({
  selector: 'app-add-referendum',
  templateUrl: './add-referendum.component.html',
  styleUrls: ['./add-referendum.component.css']
})
export class AddReferendumComponent {
  referendumFormGroup!: FormGroup;
  private submitted: boolean = false;
  referendum!: { referendumQuestion: any; description: any; title: any };

  constructor(
    private authService: AuthService,
    private _formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private referendumService: ReferendumService
  ) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe((loggedUser) => {
      if (loggedUser) {
        this.referendumFormGroup = this._formBuilder.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          isActive: [false, Validators.required],
          category: ['Referendum', Validators.required],
          publisher: [loggedUser.publisher, Validators.required],
          referendumQuestion: this._formBuilder.array([
            this._formBuilder.group({
              optionFor: ['Yes'],
              optionAgainst: ['No'],
              votesFor: [0],
              votesAgainst: [0],
            })
          ])
        });
      }
    });
  }


  onSubmit() {
    if (this.referendumFormGroup.invalid) {
      console.error('Form is invalid, fill all fields', this.referendumFormGroup);
      return;
    }

    this.submitted = true;

    const formReferendumValues = this.referendumFormGroup.value;

    let referendumQuestion2: ReferendumQuestion = formReferendumValues.referendumQuestion[0];

    let referendum: any = {
      title: formReferendumValues.title,
      description: formReferendumValues.description,
      isActive: formReferendumValues.isActive,
      publisher: formReferendumValues.publisher,
      category: formReferendumValues.category,
      referendumQuestion: referendumQuestion2
    }


    // Ensure that the structure of SociologicalSurvey matches the form
    console.log(referendum);

    // Use the mapped sociologicalSurvey object in the service call
    this.referendumService.addReferendum(referendum).subscribe(
      (data: any) => {
        console.log('Success:', data);
        Swal.fire('Success', 'Question Added', 'success');
      },
      (error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }

  getReferendumQuestionControls() {
    return (this.referendumFormGroup.get('referendumQuestion') as FormArray).controls;
  }

}
