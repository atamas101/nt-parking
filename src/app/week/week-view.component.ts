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
  constructor(private schedule: ScheduleService) {}

  showWeek(dataFromChild: any) {
    this.weekNumber = dataFromChild.weekNumber;
    // this.weekDays = dataFromChild.weekDays;

    console.log(this.weekNumber);

    this.schedule.getWeekSchedule(this.weekNumber).subscribe(result => {
      console.log(result, 'backend result');

      this.weekDays = dataFromChild.weekDays.map((day, index) => {
        let myResultDay = result.filter(rez => {
          return moment(rez.date).isSame(day, 'day');
        });
        // console.log('each result', myResultDay);
        const output = {
          day: day,
          alocated: myResultDay[0] ? myResultDay[0].alocated : [],
          others: myResultDay[0] ? myResultDay[0].others : []
        };

        return output;
      });
      // console.log('weekdays', this.weekDays);
      // TODO add results to weekDays array
      // this.weekDays.map((day, index) => {
      //   // add the related result info to that day, day becomes a smarter obj with {date + alocated + subscribers}
      //   /* general case, where weeks wouldnt match for some reson */
      //   //  let myResultDay = result.filter(result.date =>  result.date.isSame(day, 'day');)
      //   /* use index instead of filter, given that IT IS the same week */
      //   // return smarterDay{
      //   //   day: day,
      //   //   alocatedFromResult: myResultDay.something1 || result[index].soemthing1
      //   //   others: result[index].something2
      //   // }
      // });
    });
  }
}
