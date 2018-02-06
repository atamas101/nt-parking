import { Component } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'week-wrapper',
  templateUrl: './week-view.component.html'
})
export class WeekViewComponent {
  public weekDays;

  myMethod(dataFromChild: Moment[]) {
    this.weekDays = dataFromChild;
  }
}
