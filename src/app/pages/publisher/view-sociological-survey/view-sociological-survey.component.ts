import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import {Question} from "../../../model/sociological-survey-models/question.model";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-view-sociological-survey',
  templateUrl: './view-sociological-survey.component.html',
  styleUrls: ['./view-sociological-survey.component.css']
})
export class ViewSociologicalSurveyComponent implements OnInit {
  sociologicalSurveyId!: number;
  question!: Question[];
  isPublisher: boolean = false;

  constructor(private route: ActivatedRoute,
              private sociologicalSurveyService: SociologicalSurveyService,
              private authService: AuthService) {
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
    this.authService.user.subscribe(
      (loggedUser) => {
        this.isPublisher = loggedUser?.roles[0] === 'Publisher';
      }
    )
  }

  protected readonly Object = Object;
}
