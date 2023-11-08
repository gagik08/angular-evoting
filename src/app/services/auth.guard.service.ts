import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(take(1), map(user => {
      const isAuth = !!user;
      if (isAuth){
        if (user?.roles.includes(route.data['role'])) return true;
        else if (user?.roles.includes('Commission Member')) return this.router.createUrlTree(['/admin-dashboard']);
        else if (user?.roles.includes('Publisher')) return this.router.createUrlTree(['/publications/' + user?.publisher?.publisherId]);
        else if (user?.roles.includes('Voter')) return this.router.createUrlTree(['/subscriptions/' + user?.voter?.voterId]);

      }
      return this.router.createUrlTree(['/auth'])
    }))
  }
}
