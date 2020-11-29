import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupsService } from '../groups/groups.service';
import { GroupDetail } from '../groups/group';
import { ActivatedRoute } from '@angular/router';
import { ProfileDetail } from '../profile/profile';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  @Input()
  group: GroupDetail;

  constructor(public groupService: GroupsService) {}

  ngOnInit() {}

  updateProfile() {
    this.groupService.updateProfile(this.group.groupId, this.group.profile);
  }
}
