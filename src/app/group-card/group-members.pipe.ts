import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupMembers' })
export class GroupMembersPipe implements PipeTransform {
  transform(members: string[], maxLength: number = 60): any {
    const display = members ? members.map(member => member.split(' ')[0]).join(', ') : '';
    return display.length <= maxLength ? display : `${display.substring(0, maxLength)}...`;
  }
}
