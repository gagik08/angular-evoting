import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import Swal from "sweetalert2";
import {SociologicalSurvey} from "../../../model/sociological-survey-models/sociological-survey.model";
import {Question} from "../../../model/sociological-survey-models/question.model";

@Component({
  selector: 'app-add-sociological-survey',
  templateUrl: './add-sociological-survey.component.html',
  styleUrls: ['./add-sociological-survey.component.css']
})
export class AddSociologicalSurveyComponent implements OnInit {
  sociologicalSurveyFormGroup!: FormGroup;
  private submitted: boolean = false;
  sociologicalSurvey!: { question: any; description: any; title: any };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private sociologicalSurveyService: SociologicalSurveyService
  ) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe((loggedUser) => {
      this.sociologicalSurveyFormGroup = this.formBuilder.group({
        title: ['', Validators.required],
        category: ['Sociological Survey', Validators.required],
        publisher: [loggedUser?.publisher, Validators.required],
        description: ['', Validators.required],
        questions: this.formBuilder.array([
          this.createQuestion()
        ])
      });
    });
  }

  onSubmit() {
    if (this.sociologicalSurveyFormGroup.invalid) {
      console.error('Form is invalid, fill all fields', this.sociologicalSurveyFormGroup);
      return;
    }

    this.submitted = true;
    // Extract form values
    const formValues = this.sociologicalSurveyFormGroup.value;

    const formOptions = this.sociologicalSurveyFormGroup.value.options;




    // Map the values to sociologicalSurvey object
    let sociologicalSurvey2: any = {
      title: formValues.title,
      description: formValues.description,
      publisher: formValues.publisher,
      questions: formValues.questions.map((question: any) => {
        const all:any ={};
        question.options.forEach((formOption: any) => {
          all[formOption.key]=formOption.value;
        });
        return {
          content: question.content,
          options: all
        }})}
    ;

    // Ensure that the structure of SociologicalSurvey matches the form
    console.log(sociologicalSurvey2);

    // Use the mapped sociologicalSurvey object in the service call
    this.sociologicalSurveyService.addSociologicalSurvey(sociologicalSurvey2).subscribe(
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


  onAddQuestion() {
    const questionsArray = this.sociologicalSurveyFormGroup.get('questions') as FormArray;
    questionsArray.push(this.createQuestion());
  }

  createQuestion(): FormGroup {
    return this.formBuilder.group({
      content: ['', Validators.required],
      options: this.formBuilder.array([
        this.createOption(),
        this.createOption()
      ], [Validators.minLength(2)]),
    });
  }

  addOption(optionsArray: FormArray): void {
    optionsArray.push(this.createOption());
  }

  createOption(): FormGroup {
    return this.formBuilder.group({
      key: ['', Validators.required],
      value: [0]
    });
  }

  getQuestionsControl() {
    return (this.sociologicalSurveyFormGroup.get('questions') as FormArray);
  }

  getOptionsControl(questionIndex: number) {
    const questionsArray = this.getQuestionsControl();
    const question = questionsArray.at(questionIndex) as FormGroup;
    return question.get('options') as FormArray;
  }
}
