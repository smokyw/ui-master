import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Auth0UserProfile, WebAuth } from 'auth0-js';
import { User } from './user';
import { ProgressService } from '../progress/progress.service';

const USER: string = 'USER';
export const IS_LOGGED_IN: string = 'IS_LOGGED_IN';
export const TARGET_URL: string = 'TARGET_URL';

@Injectable()
export class AuthService {
  private _idToken: string = '';
  private _accessToken: string = '';
  private _expiresAt: number = 0;

  private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  user = this._user.asObservable();

  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();

  auth0 = new WebAuth({
    clientID: 'e0VgaUxRSIvPUVOy5Sx5rkgAdeN5rzja',
    domain: 'santaswap.auth0.com',
    responseType: 'token id_token',
    redirectUri: `${window.location.origin}/callback`,
    scope: 'openid'
  });

  constructor(public router: Router, private progress: ProgressService) {}

  public login() {
    console.log('Logging in');
    this.auth0.authorize();
  }

  public async handleAuthentication() {
    console.log('Handling authentication');
    try {
      this.progress.setInProgress();
      const authResult = await this.parseAuth0Hash();
      if (authResult) {
        this.cacheLoginLocally(authResult);
        await this.getProfile();
        this.navigateToTargetOrDefault();
      }
    } catch (err) {
      console.error('Unable to handle authentication', err);
      this.router.navigate(['']);
    }
    this.progress.setResolved();
  }

  public logout() {
    console.log('Logging out');
    this.removeLocalLoginCache();
    this._user.next(<User>{});
    this._isLoggedIn.next(false);
    this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    console.log('Checking if is authenticated');
    return new Date().getTime() < this._expiresAt;
  }

  public async renewTokens() {
    console.log('Renewing tokens');
    try {
      const authResult = await this.checkAuth0Session();
      this.cacheLoginLocally(authResult);
      this.getProfile();
      this.navigateToTargetOrDefault();
    } catch (err) {
      console.error('Unable to renew Auth0 token', err);
      this.logout();
    }
  }

  private navigateToTargetOrDefault() {
    const targetUrl = localStorage.getItem(TARGET_URL);
    this.router.navigate([targetUrl ? targetUrl : '/groups']);
    localStorage.removeItem(TARGET_URL);
  }

  private async getProfile() {
    try {
      const user = this.getLocallyCachedUser();
      // If user is locally cached use that one first and then asynchronously
      // get latest in case their are updates.  If no locally cached user
      // then wait until retreive profile information
      if (user) {
        this.getUpdatedProfile();
      } else {
        await this.getUpdatedProfile();
      }
    } catch (err) {
      console.error('Unable to get user profile', err);
    }
  }

  private async getUpdatedProfile() {
    const profile = await this.getAuth0Profile();
    const user = new User(profile);
    this._user.next(user);
    this.cacheUserLocally(user);
  }

  private parseAuth0Hash(): Promise<auth0.Auth0DecodedHash> {
    this.progress.setInProgress();
    return new Promise(resolve => {
      this.auth0.parseHash((err, authResult: auth0.Auth0DecodedHash) => {
        this.progress.setResolved();
        if (err) {
          throw err;
        } else {
          resolve(authResult);
        }
      });
    });
  }

  private getAuth0Profile(): Promise<Auth0UserProfile> {
    this.progress.setInProgress();
    return new Promise(resolve => {
      this.auth0.client.userInfo(this._accessToken, (err, profile: Auth0UserProfile) => {
        this.progress.setResolved();
        if (err) {
          throw err;
        } else {
          resolve(profile);
        }
      });
    });
  }

  private cacheLoginLocally(authResult): void {
    this._isLoggedIn.next(true);
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    localStorage.setItem(IS_LOGGED_IN, 'true');
  }

  private getLocallyCachedUser(): User {
    const cachedUser = localStorage.getItem(USER);
    const user = cachedUser ? JSON.parse(cachedUser) : null;
    if (user) {
      this._user.next(user);
    }
    return user;
  }

  private cacheUserLocally(user: User): void {
    localStorage.setItem(USER, JSON.stringify(user));
  }

  private removeLocalLoginCache(): void {
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    localStorage.removeItem(IS_LOGGED_IN);
    localStorage.removeItem(USER);
  }

  private checkAuth0Session(): Promise<auth0.Auth0DecodedHash> {
    this.progress.setInProgress();
    return new Promise(resolve => {
      this.auth0.checkSession({}, (err, authResult) => {
        this.progress.setResolved();
        if (err) {
          throw err;
        } else {
          resolve(authResult);
        }
      });
    });
  }
}
