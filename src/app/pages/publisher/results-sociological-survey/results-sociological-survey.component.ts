import { Component } from '@angular/core';
import {Question} from "../../../model/sociological-survey-models/question.model";
import {ActivatedRoute} from "@angular/router";
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import {MapType} from "@angular/compiler";
import {from} from "rxjs";

@Component({
  selector: 'app-results-sociological-survey',
  templateUrl: './results-sociological-survey.component.html',
  styleUrls: ['./results-sociological-survey.component.css']
})
export class ResultsSociologicalSurveyComponent {

  sociologicalSurveyId!: number;
  // title!: string;
  question!: Question[];
  // options!: Map<string, number>;

  constructor(private route: ActivatedRoute,
              private sociologicalSurveyService: SociologicalSurveyService) {
  }

  ngOnInit(): void {

    this.sociologicalSurveyId = this.route.snapshot.params['sociologicalSurveyId'];
    // this.title = this.route.snapshot.params['title'];
    console.log(this.route.snapshot.params);
    this.question = this.route.snapshot.params['question'];
    console.log(this.question);
    this.sociologicalSurveyService.getSociologicalSurveyQuestions(this.sociologicalSurveyId).subscribe(
      (data) => {
        this.question = data;
        console.log(data);
      },
      error => {
        console.error(error);
        // Handle errors as needed
      }
    )
  }

  getMaxValue(options: Map<string, number>): number {
    const values = Object.values(options);
    return Math.max(...values);
  }

  calculatePercentage(value: number, total: number): number {
    if (total === 0) {
      return 0;
    }

    const percentage = (value / total) * 100;
    return parseFloat(percentage.toFixed(0));
  }

  getTotalSum(options: Map<string, number>): number {
    return Object.values(options).reduce((sum, value) => sum + value, 0);
  }



  protected readonly Object = Object;
}
