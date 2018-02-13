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
  public subscribers;
  public othersNumber: number;
  private alocatedNumber: number;
  public subscribeBtnState = true;
  public subscribeBtnDisabled = false;
  private now = moment();
  private deadLine: Moment;
  private parkLimit: Moment;
  public currentUserId: any;
  public alreadySubscribed = false;

  ngOnInit() {
    console.log('inputData', this.inputData);

    this.inputDay = this.inputData.day;

    this.currentUserId = this.auth.getCurrentUser()._id;

    this.inputDay.set({ hour: 0, minute: 0, second: 0 });
    this.getSubscribers(this.inputData);
  }
  public showLoader(): Boolean {
    return this.showLoading;
  }
  private getSubscribers(input): void {
    this.subscribers = input;
    this.othersNumber = this.subscribers.others.length;
    this.alocatedNumber = this.subscribers.alocated.length;
    this.parkLimit = this.now.clone().add(14, 'days');

    const isAlocated = this.subscribers.alocated.find(item => {
      console.log(item);
      return item.user._id === this.currentUserId;
    });
    const isOthers = this.subscribers.others.find(item => {
      return item.user._id === this.currentUserId;
    });
    this.alreadySubscribed = isAlocated || isOthers;
    console.log('userAlocated already:', this.alreadySubscribed);
    if (this.alreadySubscribed) {
      this.subscribeBtnState = false;
    }

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
      .startOf('day')
      .toISOString();
    this.schedule
      .parkToggle({
        operation: parkLocation >= 0 ? 'park' : 'cancel',
        date: date,
        preference: parkLocation
      })
      .subscribe((data: any) => {
        this.subscribeBtnState = !this.subscribeBtnState;
        console.log('inputData', this.inputData);
        console.log('Data', data);

        this.getSubscribers({
          day: moment(data.date),
          alocated: data.alocated,
          others: data.others
        });
      });
  }
}
