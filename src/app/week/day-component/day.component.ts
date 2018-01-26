import { SubscribersService } from './../subscribers.service';
import { Observable } from 'rxjs/Observable';
import { Component, NgModule, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Moment } from 'moment';

@Component({
  selector: 'day-comp',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  constructor(private SubscribersService: SubscribersService) {}
  @Input() inputDay: Moment;
  public subscribers = this.SubscribersService.subscribers;
  subscribeBtnState: boolean = true;
  unsubscribeBtnState: boolean = false;

  othersNumber = this.subscribers.others.length;

  subscribeBtn() {
    this.subscribeBtnState = !this.subscribeBtnState;
    this.unsubscribeBtnState = !this.unsubscribeBtnState;
    console.log(
      'subscribe:',
      this.subscribeBtnState,
      'unsubscribe:',
      this.unsubscribeBtnState
    );
  }

  unsubscribeBtn() {
    this.unsubscribeBtnState = !this.unsubscribeBtnState;
    this.subscribeBtnState = !this.subscribeBtnState;
    console.log(
      'subscribe:',
      this.subscribeBtnState,
      'unsubscribe:',
      this.unsubscribeBtnState
    );
  }
}
