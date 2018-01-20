import { Component, Input } from '@angular/core';
import { Moment } from 'moment';

@Component({
  selector: 'day-comp',
  templateUrl: './day.component.html'
})
export class DayComponent {
  @Input() inputDay: Moment;
}