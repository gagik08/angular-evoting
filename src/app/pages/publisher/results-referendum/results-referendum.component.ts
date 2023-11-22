import { Component } from '@angular/core';
import {Question} from "../../../model/sociological-survey-models/question.model";
import {ActivatedRoute} from "@angular/router";
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import {ReferendumQuestion} from "../../../model/referendum-models/referendum-question.model";
import {ReferendumService} from "../../../services/referendum.service";

@Component({
  selector: 'app-results-referendum',
  templateUrl: './results-referendum.component.html',
  styleUrls: ['./results-referendum.component.css']
})
export class ResultsReferendumComponent {
  referendumId!: number;
  referendumQuestion!: ReferendumQuestion;
  title!: string;
  description!: string;


  constructor(private _route: ActivatedRoute,
              private referendumService: ReferendumService) {
  }

  ngOnInit(): void {
    this.referendumId = this._route.snapshot.params['referendumId'];
    // this.title = this._route.snapshot.params['title'];
    console.log(this._route.snapshot.params);
    this.title = this._route.snapshot.params['title'];
    this.description = this._route.snapshot.params['description'];
    this.referendumQuestion = this._route.snapshot.params['referendumQuestion'];
    console.log(this.referendumQuestion);
    this.referendumService.getReferendum(this.referendumId).subscribe(
      (data) => {
        this.referendumQuestion = data.referendumQuestion;
        console.log(data);
      },
      error => {
        console.error(error);
        // Handle errors as needed
      }
    )
  }

  getMaxValue(votesFor: number, votesAgainst: number): number {
    // const values = Object.values(options);
    return Math.max(votesFor,votesAgainst);
  }

  calculatePercentage(value: number, total: number): number {
    if (total === 0) {
      return 0;
    }

    const percentage = (value / total) * 100;
    return parseFloat(percentage.toFixed(0));  }

  getTotalSum(votesFor: number, votesAgainst: number): number {
    return votesFor + votesAgainst;
  }



  protected readonly Object = Object;
}
