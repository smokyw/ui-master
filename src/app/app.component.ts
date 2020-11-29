import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, IS_LOGGED_IN } from './auth/auth.service';
import { ThemeService } from './theme/theme.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkTheme: Observable<boolean>;

  constructor(private theme: ThemeService, public auth: AuthService, private router: Router) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.setTheme();
    this.enableAnalytics();
  }

  enableAnalytics() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).gtag('config', 'UA-90417656-1', { page_path: event.urlAfterRedirects });
      }
    });
  }

  setTheme() {
    this.isDarkTheme = this.theme.isDarkTheme;
    if (localStorage.getItem(IS_LOGGED_IN) === 'true') {
      this.auth.renewTokens();
    }
  }
}
