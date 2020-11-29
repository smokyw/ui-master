import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupsService } from '../groups/groups.service';
import { GroupDetail } from '../groups/group';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  group: Observable<GroupDetail>;

  constructor(private groupService: GroupsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.group = this.groupService.group;
    const groupId = this.route.snapshot.paramMap.get('groupId');
    this.groupService.getGroup(groupId);
  }
}
