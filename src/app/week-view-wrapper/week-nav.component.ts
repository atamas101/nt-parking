import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'nav-component',
  templateUrl: './week-nav.component.html',
  styleUrls: ['week-nav.component.css']
})
export class WeekNavComponent {
  public datePicker = 'WEEK 1';
  public dateDisplay = new Date();
  public selectedDate: string[] = [];

  addEvent(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    console.log('selected date', date);
    console.log('selected week', moment(date).isoWeek());
    console.log('this week', moment().isoWeek());

    console.log('selected Monday', moment(date).isoWeekday(1));
    console.log('selected Tuesday', moment(date).isoWeekday(2));
    console.log('selected wed', moment(date).isoWeekday(3));
    console.log('selected thur', moment(date).isoWeekday(4));
    console.log('selected fri', moment(date).isoWeekday(4));
  }
}
