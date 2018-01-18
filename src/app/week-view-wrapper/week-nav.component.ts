import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'nav-component',
  templateUrl: './week-nav.component.html',
  styleUrls: ['week-nav.component.css']
})
export class WeekNavComponent {
  public datePicker = 'WEEK 1';
  public dateDisplay = new Date();
  public selectedDate: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectedDate.push(`${type}: ${event.value}`);
  }
}
