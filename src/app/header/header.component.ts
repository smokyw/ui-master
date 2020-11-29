import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ProgressService } from '../progress/progress.service';
import { User } from '../auth/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  isInProgress: Observable<boolean>;
  user: User;

  constructor(private theme: ThemeService, public auth: AuthService, private progress: ProgressService) {}

  ngOnInit() {
    this.isDarkTheme = this.theme.isDarkTheme;
    this.isInProgress = this.progress.isInProgress;
    this.auth.user.subscribe(user => (this.user = user));
  }

  // enableSpinner() {
  //   this.progress.setInProgress();
  // }

  // disableSpinner() {
  //   this.progress.setResolved();
  // }
}
