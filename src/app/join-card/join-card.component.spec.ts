import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinCardComponent } from './join-card.component';
import { GroupsService } from '../groups/groups.service';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('JoinCardComponent', () => {
  let component: JoinCardComponent;
  let fixture: ComponentFixture<JoinCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [JoinCardComponent],
      providers: [GroupsService, AuthService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
