import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {SignupComponent} from './pages/signup/signup.component';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationComponent} from './pages/authentication/authentication.component';
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReferendumsComponent} from './referendums/referendums.component';
import {SociologicalSurveyComponent} from './sociological-surveys/sociological-survey.component';
import {MatListModule} from '@angular/material/list';
import Swal from 'sweetalert2';
import {MatSelectModule} from "@angular/material/select";
import {DashboardComponent} from './pages/admin/dashboard/dashboard.component';
import {AuthInterceptorService} from "./services/auth.interceptor.service";
import {SubscriptionsComponent} from './pages/voter/subscriptions/subscriptions.component';
import {PublicationsComponent} from './pages/publisher/publications/publications.component';
import {MatRadioModule} from "@angular/material/radio";
import {
  AddSociologicalSurveyComponent
} from './pages/publisher/add-sociological-survey/add-sociological-survey.component';
import {
  ViewSociologicalSurveyComponent
} from './pages/publisher/view-sociological-survey/view-sociological-survey.component';
import {RouterModule} from '@angular/router';
import { ResultsSociologicalSurveyComponent } from './pages/publisher/results-sociological-survey/results-sociological-survey.component';
import { AddNewQuestionComponent } from './pages/publisher/add-new-question/add-new-question.component';
import { AddReferendumComponent } from './pages/publisher/add-referendum/add-referendum.component';
import { ViewReferendumComponent } from './pages/publisher/view-referendum/view-referendum.component';
import { ResultsReferendumComponent } from './pages/publisher/results-referendum/results-referendum.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { StartReferendumComponent } from './pages/voter/start-referendum/start-referendum.component';
import { StartSociologicalSurveyComponent } from './pages/voter/start-sociological-survey/start-sociological-survey.component';
import { PublisherPublicationsComponent } from './pages/admin/publisher-publications/publisher-publications.component';
import { VoterSubscriptionsComponent } from './pages/admin/voter-subscriptions/voter-subscriptions.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    FooterComponent,
    NavbarComponent,
    AuthenticationComponent,
    HeaderComponent,
    ReferendumsComponent,
    SociologicalSurveyComponent,
    DashboardComponent,
    SubscriptionsComponent,
    PublicationsComponent,
    AddSociologicalSurveyComponent,
    ViewSociologicalSurveyComponent,
    ResultsSociologicalSurveyComponent,
    AddNewQuestionComponent,
    AddReferendumComponent,
    ViewReferendumComponent,
    ResultsReferendumComponent,
    StartReferendumComponent,
    StartSociologicalSurveyComponent,
    PublisherPublicationsComponent,
    VoterSubscriptionsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        HttpClientModule,
        MatCardModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatListModule,
        MatSelectModule,
        MatRadioModule,
        RouterModule,
        MatPaginatorModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
