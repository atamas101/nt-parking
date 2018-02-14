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
import { AuthenticationService } from '../../login/auth.service';

@Component({
  selector: 'day-comp',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  constructor(
    private schedule: ScheduleService,
    private auth: AuthenticationService
  ) {}
  @Input() inputData;
  @Input() showLoading: Boolean;

  public inputDay: Moment;
  public alocatedSorted;
  public subscribers;
  public othersCount: number;
  public subscribeBtnState = true;
  public subscribeBtnDisabled = false;
  private now = moment();
  private deadLine: Moment;
  private parkLimit: Moment;
  public currentUserId: any;

  ngOnInit() {
    this.inputDay = this.inputData.day;
    this.inputDay.set({ hour: 0, minute: 0, second: 0 });

    this.currentUserId = this.auth.getCurrentUser()._id;

    this.deadLine = this.inputDay.clone().add(-2, 'hour');

    this.getSubscribers(this.inputData);
  }

  public shouldShowLoader(): Boolean {
    return this.showLoading;
  }

  private groupBy(arr, funcProp) {
    return arr.reduce(function(acc, val) {
      (acc[funcProp(val)] = acc[funcProp(val)] || []).push(val);
      return acc;
    }, {});
  }
  private getDistributedSlots(alocated) {
    const alocatedGroupped = this.groupBy(alocated, item => item.slotType);
    // Make sure each type is an array
    for (let i = 0; i < 3; i++) {
      alocatedGroupped[i] = alocatedGroupped[i] || [];
    }
    // Build final allocated order
    return [
      ...alocatedGroupped[1],
      ...alocatedGroupped[0],
      ...alocatedGroupped[2].reverse()
    ];
  }

  private getSubscribers(input): void {
    this.subscribers = input;
    this.othersCount = this.subscribers.others.length;
    this.parkLimit = this.now
      .clone()
      .add(14, 'days')
      .endOf('week');

    // Check if current user is in alocated or in others list
    const isAlocated = this.subscribers.alocated.find(item => {
      return item.user._id === this.currentUserId;
    });
    const isOthers = this.subscribers.others.find(item => {
      return item.user._id === this.currentUserId;
    });
    if (isAlocated || isOthers) {
      this.subscribeBtnState = false;
    }
    this.computeInitialDate();

    for (let i = 0; i < 3; i++) {
      if (!this.subscribers.alocated[i]) {
        this.subscribers.alocated[i] = { user: {}, slotType: 0 };
      }
    }
    this.alocatedSorted = this.getDistributedSlots(this.subscribers.alocated);

    this.showLoading = false;
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
      .startOf('day')
      .toISOString();
    this.showLoading = true;
    this.schedule
      .parkToggle({
        operation: parkLocation >= 0 ? 'park' : 'cancel',
        date: date,
        preference: parkLocation
      })
      .subscribe((data: any) => {
        this.subscribeBtnState = !this.subscribeBtnState;

        this.getSubscribers({
          day: moment(data.date),
          alocated: data.alocated,
          others: data.others
        });
      });
  }
}
