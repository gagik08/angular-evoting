import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest, LoginResponse} from "../model/login.model";
import {BehaviorSubject, Observable, of, switchMap} from "rxjs";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LoggedUser} from "../model/logger-user.model";
import {Router} from "@angular/router";
import {PublishersService} from "./publishers.service";
import {VoterService} from "./voter.service";
import {Voter} from "../model/voter.model";
import {Publisher} from "../model/publisher.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelperService = new JwtHelperService();
  user = new BehaviorSubject<LoggedUser | null>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private publisherService: PublishersService,
              private voterService: VoterService) {
  }

  public login(user: LoginRequest): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    return this.http.post<LoginResponse>(environment.backendHost + "/login", formData);
  }

  saveToken(jwtTokens: LoginResponse) {
    const decodedAccessToken = this.jwtHelperService.decodeToken(jwtTokens.accessToken);
    const loggedUser = new LoggedUser(decodedAccessToken.sub, decodedAccessToken.roles, jwtTokens.accessToken, this.getExpirationDate(decodedAccessToken.exp), undefined, undefined);
    this.user.next(loggedUser);
    this.autoLogout(this.getExpirationDate(decodedAccessToken.exp).valueOf() - new Date().valueOf());
    localStorage.setItem('userData', JSON.stringify(loggedUser));
    this.redirectLoggedInUser(decodedAccessToken, jwtTokens.accessToken);
  }

  redirectLoggedInUser(decodedToken: any, accessToken: string) {
    if (decodedToken.roles.includes("Commission Member")) {
      this.router.navigateByUrl("/admin-dashboard");
    } else if (decodedToken.roles.includes("Publisher")) {
      this.publisherService.loadPublisherByUsername(decodedToken.sub).pipe(
        switchMap(publisher => {
          const loggedUser = new LoggedUser(decodedToken.sub, decodedToken.roles, accessToken, this.getExpirationDate(decodedToken.exp), undefined, publisher);
          this.user.next(loggedUser);
          localStorage.setItem('userData', JSON.stringify(loggedUser));
          return of(publisher); // Return the publisher to continue the chain
        })
      ).subscribe(
        () => {
          this.router.navigateByUrl("/publications");
        },
        error => {
          console.error('Error loading publisher:', error);
        }
      );
    } else if (decodedToken.roles.includes("Voter")) {
      this.voterService.loadVoterByUsername(decodedToken.sub).pipe(
        switchMap(voter => {
          const loggedUser = new LoggedUser(decodedToken.sub, decodedToken.roles, accessToken, this.getExpirationDate(decodedToken.exp), voter, undefined);
          this.user.next(loggedUser);
          localStorage.setItem('userData', JSON.stringify(loggedUser));
          return of(voter); // Return the voter to continue the chain
        })
      ).subscribe(
        () => {
          this.router.navigateByUrl("/subscriptions/" + decodedToken.sub);
        },
        error => {
          console.error('Error loading voter:', error);
        }
      );
    }
  }


  autoLogin() {
    const userData: {
      username: string,
      roles: string[],
      _token: string,
      _expiration: Date;
      voter: Voter | undefined,
      publisher: Publisher | undefined
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) return;
    const loadedUser = new LoggedUser(userData.username,
      userData.roles,
      userData._token,
      new Date(userData._expiration),
      userData.voter,
      userData.publisher);

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(loadedUser._expiration.valueOf() - new Date().valueOf());
    }
  }

  logout() {
    localStorage.clear();
    this.user.next(null);
    this.router.navigate(['/']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  refreshPublisher(publisher: Publisher) {
    const userData: {
      username: string,
      roles: string[],
      _token: string,
      _expiration: Date,
      voter: Voter | undefined,
      publisher: Publisher | undefined,
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) return;
    const loggedUser = new LoggedUser(userData.username, userData.roles, userData._token, new Date(userData._expiration), userData.voter, publisher);
    this.user.next(loggedUser);
    localStorage.setItem('userData', JSON.stringify(loggedUser));
  }

  refreshVoter(voter: Voter){
    const userData: {
      username: string,
      roles: string[],
      _token: string,
      _expiration: Date,
      voter: Voter | undefined,
      publisher: Publisher | undefined,
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) return;
    const loggedUser = new LoggedUser(userData.username, userData.roles, userData._token, new Date(userData._expiration), voter, userData.publisher);
    this.user.next(loggedUser);
    localStorage.setItem('userData', JSON.stringify(loggedUser));
  }

  getExpirationDate(exp: number) {
    const date = new Date(0);
    date.setUTCSeconds(exp);
    return date;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }
}
