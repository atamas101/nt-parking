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
  public weekDaysStatus;
  public showLoading = false;
  constructor(private schedule: ScheduleService) {}

  showWeek(dataFromChild: any) {
    this.weekNumber = dataFromChild.weekNumber;
    this.showLoading = true;
    this.schedule.getWeekSchedule(this.weekNumber).subscribe(result => {
      this.weekDays = dataFromChild.weekDays.map((day, index) => {
        const myResultDay = result.filter(res => {
          return moment(res.date).isSame(day, 'day');
        });

        const output = {
          day: day,
          alocated: myResultDay[0] ? myResultDay[0].alocated : [],
          others: myResultDay[0] ? myResultDay[0].others : []
        };

        return output;
      });
      this.showLoading = false;
    });
  }
}
