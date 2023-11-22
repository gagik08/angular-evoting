import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "./pages/signup/signup.component";
import {AuthenticationComponent} from "./pages/authentication/authentication.component";
import {SociologicalSurveyComponent} from "./sociological-surveys/sociological-survey.component";
import {HeaderComponent} from "./header/header.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {DashboardComponent} from "./pages/admin/dashboard/dashboard.component";
import {PublicationsComponent} from "./pages/publisher/publications/publications.component";
import {SubscriptionsComponent} from "./pages/voter/subscriptions/subscriptions.component";
import {AuthGuardService} from "./services/auth.guard.service";
import {
  AddSociologicalSurveyComponent
} from "./pages/publisher/add-sociological-survey/add-sociological-survey.component";
import {
  ViewSociologicalSurveyComponent
} from "./pages/publisher/view-sociological-survey/view-sociological-survey.component";
import {
  ResultsSociologicalSurveyComponent
} from "./pages/publisher/results-sociological-survey/results-sociological-survey.component";
import {AddNewQuestionComponent} from "./pages/publisher/add-new-question/add-new-question.component";
import {ReferendumsComponent} from "./referendums/referendums.component";
import {ResultsReferendumComponent} from "./pages/publisher/results-referendum/results-referendum.component";
import {ViewReferendumComponent} from "./pages/publisher/view-referendum/view-referendum.component";
import {AddReferendumComponent} from "./pages/publisher/add-referendum/add-referendum.component";
import {
  StartSociologicalSurveyComponent
} from "./pages/voter/start-sociological-survey/start-sociological-survey.component";
import {StartReferendumComponent} from "./pages/voter/start-referendum/start-referendum.component";
import {PublisherPublicationsComponent} from "./pages/admin/publisher-publications/publisher-publications.component";
import {VoterSubscriptionsComponent} from "./pages/admin/voter-subscriptions/voter-subscriptions.component";

const routes: Routes = [
  {path: '', component: AuthenticationComponent},
  {path: 'add-sociological-survey', component: AddSociologicalSurveyComponent, canActivate:[AuthGuardService], data: {role: 'Publisher'}},
  {path: 'add-referendum', component: AddReferendumComponent, canActivate:[AuthGuardService], data: {role: 'Publisher'}},
  {path: 'view-sociological-survey/:sociologicalSurveyId/add-question', component: AddNewQuestionComponent, canActivate:[AuthGuardService], data: {role: 'Publisher'}},
  {path: 'view-sociological-survey/:sociologicalSurveyId/questions', component: ViewSociologicalSurveyComponent},
  {path: 'view-referendum/:referendumId/referendum-question', component: ViewReferendumComponent},
  {path: 'results-sociological-survey/:sociologicalSurveyId/questions/results', component: ResultsSociologicalSurveyComponent},
  {path: 'results-referendum/:referendumId/referendum-question/results', component: ResultsReferendumComponent},
  {path: 'voting-items/:publisherId/publisher-publications', component: PublisherPublicationsComponent},
  {path: 'voting-items/:voterId/voter-subscriptions', component: VoterSubscriptionsComponent},
  {path: 'sociological-surveys', component: SociologicalSurveyComponent},
  {path: 'referendums', component: ReferendumsComponent},
  {path: 'publications/:id', component: PublicationsComponent, canActivate:[AuthGuardService], data: {role: 'Publisher'}},
  {path: 'subscriptions/:id', component: SubscriptionsComponent, canActivate:[AuthGuardService], data: {role: 'Voter'}},
  {path: 'start/:subscriptionId/sociological-survey', component: StartSociologicalSurveyComponent, canActivate:[AuthGuardService], data: {role: 'Voter'}},
  {path: 'start/:subscriptionId/referendum', component: StartReferendumComponent, canActivate:[AuthGuardService], data: {role: 'Voter'}},
  {path: 'admin-dashboard', component: DashboardComponent, canActivate:[AuthGuardService], data: {role: 'Commission Member'}},
  {path: 'navbar', component: NavbarComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'auth', component: AuthenticationComponent},
  {path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
