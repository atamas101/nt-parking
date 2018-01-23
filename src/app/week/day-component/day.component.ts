import { Component, NgModule, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Moment } from 'moment';

@Component({
  selector: 'day-comp',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent {
  @Input() inputDay: Moment;

  subscribeBtnState: boolean = true;
  unsubscribeBtnState: boolean = false;
  public subscribers = {
    alocated: [
      { name: 'Bintintan Alexandru', slot: 's1' },
      { name: 'Voicu Iulia', slot: 's2' },
      { name: 'Popoviciu Sebastian', slot: 's3' }
    ],
    others: [
      { name: 'Bintintan Alexandru', slot: 's1' },
      { name: 'Voicu Iulia', slot: 's2' },
      { name: 'Popoviciu Sebastian', slot: 's3' }
    ]
  };
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
