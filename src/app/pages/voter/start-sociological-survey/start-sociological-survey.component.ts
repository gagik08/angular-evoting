import {Component, OnInit} from '@angular/core';
import {LocationStrategy} from "@angular/common";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {SociologicalSurveyService} from "../../../services/sociological-survey.service";
import {Question} from "../../../model/sociological-survey-models/question.model";
import {SociologicalSurvey} from "../../../model/sociological-survey-models/sociological-survey.model";
import {Category} from "../../../model/category.model";
import {Publisher} from "../../../model/publisher.model";
import Swal from "sweetalert2";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-start-sociological-survey',
  templateUrl: './start-sociological-survey.component.html',
  styleUrls: ['./start-sociological-survey.component.css']
})
export class StartSociologicalSurveyComponent implements OnInit {
  sociologicalSurveyId!: number;
  sociologicalSurvey!: {
    title: string,
    description: string,
    category: Category;
    publisher: Publisher;
    questions: Question[];
  };
  currentQuestionIndex: number = 0;
  errorMessage!: string;
  selectedOption: undefined;
  currentVoterId!: number | undefined;


  constructor(
    private _route: ActivatedRoute,
    private sociologicalSurveyService: SociologicalSurveyService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe(
    (loggedUser) => {
      this.currentVoterId = loggedUser?.voter?.voterId;
    }
    )
    this.sociologicalSurveyId = this._route.snapshot.params['subscriptionId'];
    this.loadSociologicalSurvey();
  }

  loadSociologicalSurvey() {
    this.sociologicalSurveyService.getSociologicalSurvey(this.sociologicalSurveyId).subscribe(
      (data: SociologicalSurvey) => {
        this.sociologicalSurvey = {
          title: data.title,
          description: data.description,
          category: data.category,
          publisher: data.publisher,
          questions: [],
        };
        this.loadQuestions().subscribe(
          (questions: Question[]) => {
            this.sociologicalSurvey.questions = questions;
            console.log(this.sociologicalSurvey.questions);
          },
          (error: any) => {
            console.log(error);
          }
        );
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.sociologicalSurvey.questions.length - 1) {
      // Move to the next question
      this.currentQuestionIndex++;
      // Reset selected option for the new question
      this.selectedOption = undefined;
    } else {
      // You've reached the last question, handle accordingly
      this.showSuccessPopupAndRedirect();
    }
  }

  private showSuccessPopupAndRedirect() {
    Swal.fire({
      title: 'Voting Successful!',
      text: 'Thank you for participating in the survey.',
      icon: 'success',
    }).then(() => {
      this.router.navigate([`/subscriptions/${this.currentVoterId}`]);
    });
  }

  voteForSelectedOption() {
    if (this.sociologicalSurvey && this.sociologicalSurvey.questions.length > 0) {
      if (this.selectedOption) {
        this.sociologicalSurveyService.voteForSelectedOption(
          this.sociologicalSurveyId,
          this.selectedOption
        ).subscribe(
          (response: any) => {
            console.log('Response from server:', response);
            this.nextQuestion();
          },
          (error: any) => {
            console.error('Error incrementing value', error);
            this.nextQuestion();

          }
        );
      }
    }
  }

  protected readonly Object = Object;

  private loadQuestions() {
    return this.sociologicalSurveyService.getSociologicalSurveyQuestions(this.sociologicalSurveyId);
  }
}
