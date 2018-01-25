import { Component, Output, EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Moment } from 'moment';

@Component({
  selector: 'nav-component',
  templateUrl: './week-nav.component.html',
  styleUrls: ['week-nav.component.css']
})
export class WeekNavComponent implements OnInit {
  public datePicker: string;
  public selectedDate: Date;
  public firstDay: Moment;
  public lastDay: Moment;

  @Output() notify = new EventEmitter();

  ngOnInit() {
    this.selectedDate = new Date();
    this.refreshDate(this.selectedDate);
  }

  nextWeek() {
    const selectedWeek = moment(this.selectedDate).isoWeek();
    this.selectedDate = moment(this.selectedDate)
      .isoWeek(selectedWeek + 1)
      .toDate();
    this.refreshDate(this.selectedDate);
  }

  previousWeek() {
    const selectedWeek = moment(this.selectedDate).isoWeek();
    this.selectedDate = moment(this.selectedDate)
      .isoWeek(selectedWeek - 1)
      .toDate();
    this.refreshDate(this.selectedDate);
  }

  refreshDate(newDate: Date) {
    this.datePicker = 'Week ' + moment(newDate).isoWeek();
    this.firstDay = moment(newDate).isoWeekday(1);
    this.lastDay = moment(newDate).isoWeekday(5);

    const weekDaysSelected = [
      moment(newDate).isoWeekday(1),
      moment(newDate).isoWeekday(2),
      moment(newDate).isoWeekday(3),
      moment(newDate).isoWeekday(4),
      moment(newDate).isoWeekday(5)
    ];
    this.notify.emit(weekDaysSelected);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    this.selectedDate = date;
    this.refreshDate(date);
  }
}
