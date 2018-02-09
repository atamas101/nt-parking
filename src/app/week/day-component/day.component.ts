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
  private alocatedNumber: number;
  public subscribeBtnState = true;
  public subscribeBtnDisabled = false;
  private now = moment();
  private deadLine: Moment;
  private parkLimit: Moment;

  ngOnInit() {
    this.inputDay = this.inputData.day;

    this.inputDay.set({ hour: 0, minute: 0, second: 0 });
    this.subscribers = this.inputData;
    this.othersNumber = this.subscribers.others.length;
    this.alocatedNumber = this.subscribers.alocated.length;
    this.parkLimit = this.now.clone().add(14, 'days');

    this.deadLine = this.inputDay.clone().add(-2, 'hour');
    this.computeInitialDate();

    for (let i = 0; i < 3; i += 1) {
      this.subscribers.alocated[i]
        ? this.subscribers.alocated[i]
        : (this.subscribers.alocated[i] = { user: {} });
    }
  }

  computeInitialDate() {
    if (
      this.now.isAfter(this.deadLine, 'minute') ||
      this.inputDay.isAfter(this.parkLimit, 'day')
    ) {
      this.subscribeBtnDisabled = true;
    }
  }
  subscribeBtnToggle(parkLocation) {
    const date = moment(this.inputDay)
      .utc()
      .startOf('day')
      .toISOString();
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
}
