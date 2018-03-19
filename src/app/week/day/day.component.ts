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
import { MatDialog } from '@angular/material';
import { SubscribersListComponent } from '../subscribers/subscribers-list.component';

const PARKING_SPOTS = 3;
const PARK_DEADLINE = 4; // Hours before (utc) midnight
const CANCEL_DEADLINE = 5; // Hour of the day (utc) until you can cancel
const PARK_LIMIT = 14; // Days available in future

@Component({
  selector: 'day-comp',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  constructor(
    private schedule: ScheduleService,
    private auth: AuthenticationService,
    public dialog: MatDialog
  ) {}
  @Input() inputData;
  @Input() showLoading: Boolean;

  public inputDay: Moment;
  public dayLocked: Boolean;
  public subscribers;
  public othersCount: number;
  public subscribeBtnState = true;
  public subscribeBtnDisabled = false;
  public cancelBtnDisabled = false;
  public currentUserId: any;
  private now = moment();
  private cancelDeadline: Moment;
  private deadLine: Moment;
  private parkLimit: Moment;

  ngOnInit() {
    this.inputDay = this.inputData.day;
    this.inputDay.set({ hour: 12, minute: 0, second: 0 });
    this.currentUserId = this.auth.getCurrentUser()._id;
    this.deadLine = this.inputDay
      .clone()
      .utc()
      .startOf('day')
      .add(-PARK_DEADLINE, 'hour');
    this.cancelDeadline = this.inputDay
      .utc()
      .clone()
      .startOf('day')
      .add(CANCEL_DEADLINE, 'hour');

    this.parkLimit = this.now
      .clone()
      .utc()
      .startOf('day')
      .add(PARK_LIMIT, 'days')
      .endOf('week');

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
  private getExactDate(date: Moment | Date): Moment {
    return moment(date)
      .utc()
      .startOf('day')
      .add(12, 'hour');
  }
  private getDistributedSlots(alocated) {
    const alocatedGroupped = this.groupBy(alocated, item => item.slotType);
    // Make sure each type is an array
    for (let i = 0; i < PARKING_SPOTS; i++) {
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
    this.checkAvailability();

    for (let i = 0; i < PARKING_SPOTS; i++) {
      if (!this.subscribers.alocated[i]) {
        this.subscribers.alocated[i] = { user: {}, slotType: 0 };
      }
    }
    this.subscribers.alocated = this.getDistributedSlots(
      this.subscribers.alocated
    );

    this.showLoading = false;
  }

  private checkAvailability() {
    if (
      this.subscribers.alocated.length >= 3 &&
      (this.now.utc().isAfter(this.deadLine, 'minute') ||
        this.inputDay.isAfter(this.parkLimit, 'day'))
    ) {
      this.subscribeBtnDisabled = true;
    }

    if (this.now.utc().isAfter(this.cancelDeadline, 'minute')) {
      this.cancelBtnDisabled = true;
    }
    this.dayLocked = this.subscribeBtnDisabled && this.cancelBtnDisabled;
  }

  public openSubscribersList(): void {
    this.dialog.open(SubscribersListComponent, {
      data: { selectedDay: this.inputDay, subscribers: this.subscribers },
      width: '80vw'
    });
  }

  public subscribeBtnToggle(parkLocation) {
    const date = this.getExactDate(this.inputDay).toISOString();
    this.showLoading = true;
    this.schedule
      .parkToggle({
        operation: parkLocation >= 0 ? 'park' : 'cancel',
        date: date,
        preference: parkLocation
      })
      .subscribe(
        (data: any) => {
          this.subscribeBtnState = !this.subscribeBtnState;

          this.getSubscribers({
            day: moment(data.date),
            alocated: data.alocated,
            others: data.others
          });
        },
        () => {
          this.showLoading = false;
        }
      );
  }
}
