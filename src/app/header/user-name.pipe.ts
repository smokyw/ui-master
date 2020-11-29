import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userName' })
export class UserNamePipe implements PipeTransform {
  transform(name: string, maxLength: number = 40): any {
    const display = name ? name.split(' ')[0] : '';
    return display.length <= maxLength ? display : `${display.substring(0, maxLength)}...`;
  }
}
