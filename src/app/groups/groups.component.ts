import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupsService } from './groups.service';
import { Group } from './group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: Group[];

  constructor(private groupService: GroupsService) {}

  ngOnInit() {
    this.groupService.groups.subscribe(groups => (this.groups = groups));
    this.groupService.getGroups();
  }
}
