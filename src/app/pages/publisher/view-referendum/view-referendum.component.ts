import { Component } from '@angular/core';
import {Question} from "../../../model/sociological-survey-models/question.model";
import {ActivatedRoute} from "@angular/router";
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import {ReferendumQuestion} from "../../../model/referendum-models/referendum-question.model";
import {ReferendumService} from "../../../services/referendum.service";

@Component({
  selector: 'app-view-referendum',
  templateUrl: './view-referendum.component.html',
  styleUrls: ['./view-referendum.component.css']
})
export class ViewReferendumComponent {
  referendumId!: number;
  referendumQuestion!: ReferendumQuestion;
  title!: string;
  description!: string;

  constructor(private _route: ActivatedRoute,
              private referendumService: ReferendumService) {
  }

  ngOnInit(): void {
    this.referendumId = this._route.snapshot.params['referendumId'];

    this.referendumService.getReferendum(this.referendumId).subscribe(
      (data) => {
        this.referendumQuestion = data.referendumQuestion;
        this.title = data.title; // Assuming title and description are properties of your Referendum model
        this.description = data.description;
        console.log(data);
      },
      error => {
        console.error(error);
        // Handle errors as needed
      }
    );
  }

  protected readonly Object = Object;
}
