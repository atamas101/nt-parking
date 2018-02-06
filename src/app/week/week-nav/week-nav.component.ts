import { Component, Output, EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Moment } from 'moment';

@Component({
  selector: 'nav-component',
  templateUrl: './week-nav.component.html',
  styleUrls: ['week-nav.component.scss']
})
export class WeekNavComponent implements OnInit {
  public weekNumber: Number;
  public selectedDate: Date;
  public firstDay: Moment;
  public lastDay: Moment;

  @Output() notify = new EventEmitter();

  ngOnInit() {
    this.selectedDate = moment(new Date()).toDate();
    this.refreshDate(this.selectedDate);
  }

  changeWeek(increment) {
    const selectedWeek = moment(this.selectedDate).isoWeek();
    this.selectedDate = moment(this.selectedDate)
      .isoWeek(selectedWeek + increment)
      .toDate();
    this.refreshDate(this.selectedDate);
  }

  refreshDate(newDate: Date) {
    this.weekNumber = moment(newDate).isoWeek();
    this.firstDay = moment(newDate).isoWeekday(1);
    this.lastDay = moment(newDate).isoWeekday(5);

    const weekDaysSelected = [1, 2, 3, 4, 5].map(day =>
      moment(newDate).isoWeekday(day)
    );

    this.notify.emit(weekDaysSelected);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    this.refreshDate(event.value);
  }
}
