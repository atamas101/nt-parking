import { ScheduleService } from './../schedule.service';
import { Observable } from 'rxjs/Observable';
import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Moment } from 'moment';
import * as moment from 'moment';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'day-comp',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  constructor(private schedule: ScheduleService) {}
  @Input() inputData;

  public inputDay: Moment;
  public subscribers;
  public othersNumber: number;
  public othersToggle: boolean;
  private alocatedNumber: number;
  public subscribeBtnState = true;
  public subscribeBtnDisabled = false;
  private now = moment();
  private deadLine: Moment;

  ngOnInit() {
    this.inputDay = this.inputData.day;
    // these 4 variables will come from the week-view.component
    this.inputDay.set({ hour: 0, minute: 0, second: 0 });
    this.subscribers = this.inputData;
    this.othersNumber = this.subscribers.others.length;
    this.alocatedNumber = this.subscribers.alocated.length;
    // end of new content from weekdays-view.component

    this.deadLine = this.inputDay.clone().add(-2, 'hour');
    this.isOtherListPopulated();
    this.computeInitialDate();

    for (let i = 0; i < 3; i += 1) {
      this.subscribers.alocated[i]
        ? this.subscribers.alocated[i]
        : (this.subscribers.alocated[i] = { user: {} });
    }
  }

  computeInitialDate() {
    if (this.now.isAfter(this.deadLine, 'minute')) {
      // && this.subscribers.alocated.length > 2
      this.subscribeBtnDisabled = true;
    }
  }

  subscribeBtnToggle(parkLocation) {
    const date = moment(this.inputDay)
      .utc()
      .startOf('day')
      .toISOString();
    console.log(date);
    this.schedule
      .parkToggle({
        operation: parkLocation >= 0 ? 'park' : 'cancel',
        date: date,
        preference: parkLocation
      })
      .subscribe(data => {
        this.subscribeBtnState = !this.subscribeBtnState;
      });
  }
  isOtherListPopulated() {
    if (this.othersNumber < 1) {
      this.othersToggle = true;
    } else {
      this.othersToggle = false;
    }
  }
}
