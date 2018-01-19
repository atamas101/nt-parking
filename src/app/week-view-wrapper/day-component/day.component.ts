import { Component } from '@angular/core';

@Component({
  selector: 'day-comp',
  templateUrl: './day.component.html'
})
export class DayComponent {
  dayOfTheWeek = new Date();
}