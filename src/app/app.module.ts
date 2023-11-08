import {NgModule} from '@angular/core';
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
import { SubscriptionsComponent } from './pages/voter/subscriptions/subscriptions.component';
import { PublicationsComponent } from './pages/publisher/publications/publications.component';

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
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
