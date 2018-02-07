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
  @Input() inputDay: Moment;

  othersNumber: number;
  subscribers;
  subscribeBtnState = true;

  ngOnInit() {
    this.subscribers = this.schedule.getSubscribers();
    this.othersNumber = this.subscribers.others.length;
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
        console.log(data);
        this.subscribeBtnState = !this.subscribeBtnState;
      });
  }
}
