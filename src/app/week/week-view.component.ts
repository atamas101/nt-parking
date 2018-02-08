import { Component } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'week-wrapper',
  templateUrl: './week-view.component.html'
})
export class WeekViewComponent {
  public weekNumber;
  public weekDays;
  constructor(private schedule: ScheduleService) {}

  showWeek(dataFromChild: any) {
    this.weekNumber = dataFromChild.weekNumber;
    this.weekDays = dataFromChild.weekDays;
    console.log(this.weekNumber);
    this.schedule.getWeekSchedule(this.weekNumber).subscribe(result => {
      console.log(result);
    });
  }
}
