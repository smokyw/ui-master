import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private inProgress: Subject<boolean> = new BehaviorSubject<boolean>(false);
  isInProgress = this.inProgress.asObservable();

  constructor() {}

  setInProgress() {
    this.inProgress.next(true);
  }

  setResolved() {
    this.inProgress.next(false);
  }
}
