import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Group, GroupDetail } from './group';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { ProfileDetail } from '../profile/profile';
import { ProgressService } from '../progress/progress.service';
import { User } from '../auth/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GroupsService {
  private BASE_URL: string = environment.apiUrl;

  user: User;

  private _groups: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);
  groups = this._groups.asObservable();

  private _group: BehaviorSubject<GroupDetail> = new BehaviorSubject<GroupDetail>(null);
  group = this._group.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private progress: ProgressService,
    private router: Router
  ) {
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.getGroups();
      }
    });
  }

  createGroup(name: string): void {
    if (this.user && this.user.userId) {
      this.progress.setInProgress();
      const request = { name, user: this.user };
      this.http.post<GroupDetail>(`${this.BASE_URL}/users/${this.user.userId}/groups`, request).subscribe(group => {
        this._group.next(group);
        this.router.navigate([`/groups/${group.groupId}`]);
        this.progress.setResolved();
      });
    }
  }

  joinGroup(code: string): void {
    if (this.user && this.user.userId) {
      this.progress.setInProgress();
      const request = this.user;
      this.http
        .post<GroupDetail>(`${this.BASE_URL}/groups/${code}/users/${this.user.userId}`, request)
        .subscribe(group => {
          this._group.next(group);
          this.router.navigate([`/groups/${group.groupId}`]);
          this.progress.setResolved();
        });
    }
  }

  getGroups(): void {
    if (this.user && this.user.userId) {
      this.progress.setInProgress();
      this.http.get<Group[]>(`${this.BASE_URL}/users/${this.user.userId}/groups`).subscribe(groups => {
        this._groups.next(groups);
        this.progress.setResolved();
      });
    }
  }

  getGroup(groupId: string): void {
    if (this.user && this.user.userId) {
      this.progress.setInProgress();
      this.http.get<GroupDetail>(`${this.BASE_URL}/users/${this.user.userId}/groups/${groupId}`).subscribe(group => {
        this._group.next(group);
        this.progress.setResolved();
      });
    }
  }

  matchGroup(groupId: string): void {
    if (this.user && this.user.userId) {
      this.progress.setInProgress();
      this.http
        .post<GroupDetail>(`${this.BASE_URL}/users/${this.user.userId}/groups/${groupId}/match`, null)
        .subscribe(group => {
          this._group.next(group);
          this.progress.setResolved();
        });
    }
  }

  updateProfile(groupId: string, profile: ProfileDetail): void {
    if (this.user && this.user.userId) {
      this.progress.setInProgress();
      this.http
        .put<ProfileDetail>(`${this.BASE_URL}/groups/${groupId}/users/${this.user.userId}`, profile)
        .subscribe(profile => {
          this.progress.setResolved();
        });
    }
  }
}
