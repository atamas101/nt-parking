import { Component } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'week-wrapper',
  templateUrl: './week-view.component.html'
})
export class WeekViewComponent {
  title = 'salut';
  public weekDays;

  myMethod(dataFromChild: Moment[]) {
    console.log('Data from child: ', dataFromChild);
    console.table(dataFromChild);
    console.log(dataFromChild[0].isoWeek());

    /*for (let i = 0; i < 6; i++) {
      console.log(dataFromChild[i].isoWeekday());
    }*/
    this.weekDays = dataFromChild;
  }
}
