import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../groups/group';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent implements OnInit {
  @Input()
  group: Group;

  constructor() {}

  ngOnInit() {}
}
