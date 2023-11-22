import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormArray} from "@angular/forms";
import {Question} from "../../../model/sociological-survey-models/question.model";
import {SociologicalSurvey} from "../../../model/sociological-survey-models/sociological-survey.model";
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import Swal from "sweetalert2";
import {map} from "rxjs";

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.css']
})
export class AddNewQuestionComponent implements OnInit {
  numberOfOptions!: number;
  addQuestionFormGroup!: FormGroup;
  sociologicalSurveyId!: number;
  question: any = {
    sociologicalSurvey: {} as SociologicalSurvey,
    content: "",
    options: new Map<string, number>(),
  };
  submitted = false;


  constructor(private _route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private sociologicalSurveyService: SociologicalSurveyService) {
  }

  ngOnInit(): void {
    this.sociologicalSurveyId = this._route.snapshot.params['sociologicalSurveyId'];
    this.question.sociologicalSurvey['sociologicalSurveyId'] = this.sociologicalSurveyId;

    this.addQuestionFormGroup = this._formBuilder.group({
      content: ['', Validators.required],
      numberOfOptions: ['', Validators.required],
      options: this._formBuilder.array([
        this._formBuilder.group({
          key: ['', Validators.required],
          value: [0]
        })
      ]),
    });
  }

  get getOptions() {
    return this.addQuestionFormGroup.get('options') as FormArray;
  }

  get f() {
    return this.addQuestionFormGroup.controls;
  }


  onChangeOptions(e: any) {
    const numberOfOptions = e.target.value || 0;
    const currentOptionsLength = this.getOptions.length;

    if (currentOptionsLength < numberOfOptions) {
      for (let i = currentOptionsLength; i < numberOfOptions; i++) {
        this.getOptions.push(this._formBuilder.group({
          key: ['', Validators.required],
          value: [0]
        }));
      }
    } else {
      for (let i = currentOptionsLength - 1; i >= numberOfOptions; i--) {
        this.getOptions.removeAt(i);
      }
    }
  }

  onSubmit() {
    if (this.addQuestionFormGroup.invalid) {
      console.error('Form is invalid:', this.addQuestionFormGroup);
      return;
    }

    this.submitted = true;

    // Manually construct the question object
    this.question.sociologicalSurvey.sociologicalSurveyId = this.sociologicalSurveyId;
    this.question.content = this.addQuestionFormGroup.value.content;

    // Manually map options from the form value to a Map
    const formOptions = this.addQuestionFormGroup.value.options;

    const optionsMap = new Map<string, number>();
    const all:any ={};

    formOptions.forEach((formOption: any) => {
      all[formOption.key]=formOption.value;
      optionsMap.set(formOption.key, formOption.value);
    });

    this.question.options = all;


    console.log('Submitting question:', optionsMap);

    this.sociologicalSurveyService.addQuestionToSociologicalSurvey(this.question, this.sociologicalSurveyId).subscribe(
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

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.addQuestionFormGroup.reset();
    this.getOptions.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.getOptions.reset();
  }

}
