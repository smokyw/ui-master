import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupStatus' })
export class GroupStatusPipe implements PipeTransform {
  transform(matched: boolean): any {
    return matched ? 'This group has been matched' : 'Waiting for more people to join';
  }
}
