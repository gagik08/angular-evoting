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

const routes: Routes = [
  {path: '', component: AuthenticationComponent},
  {path: 'sociological-surveys', component: SociologicalSurveyComponent, canActivate:[AuthGuardService], data: {role: 'Publisher'}},
  {path: 'publications/:id', component: PublicationsComponent, canActivate:[AuthGuardService], data: {role: 'Publisher'}},
  {path: 'subscriptions/:id', component: SubscriptionsComponent, canActivate:[AuthGuardService], data: {role: 'Voter'}},
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
