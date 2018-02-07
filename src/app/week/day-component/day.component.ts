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
  // @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  private subscribers;
  othersNumber: number;
  alocatedNumber: number;
  public subscribeBtnState = true;
  public subscribeBtnDisabled = false;
  private now = Observable.of(moment());
  private deadLine: Moment;

  private hourToCompare = moment().set({ hour: 22, minute: 0, second: 0 });

  ngOnInit() {
    this.inputDay.set({ hour: 0, minute: 0, second: 0 });
    this.subscribers = this.schedule.getSubscribers();
    this.othersNumber = this.subscribers.others.length;
    this.alocatedNumber = this.subscribers.alocated.length;

    this.deadLine = this.inputDay.clone().add(-2, 'hour');

    this.now.subscribe(data => {
      console.log('lol', data);
      if (
        data.isAfter(this.deadLine, 'minute') &&
        this.subscribers.alocated.length > 2
      ) {
        this.subscribeBtnDisabled = true;
      }
    });
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
