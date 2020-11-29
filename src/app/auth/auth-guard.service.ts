import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService, TARGET_URL } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  isLoggedIn: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.isLoggedIn) {
      // set target url and navigate when logged in (set here and pickup in auth?)
      const path = route.url.map(segment => segment.path).reduce((path, segment) => `${path}/${segment}`);
      localStorage.setItem(TARGET_URL, path);
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
