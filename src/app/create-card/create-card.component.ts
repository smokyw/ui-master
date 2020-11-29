import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups/groups.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {
  groupName: string;
  constructor(private groupService: GroupsService) {}

  ngOnInit() {}

  createGroup() {
    this.groupService.createGroup(this.groupName);
  }
}
