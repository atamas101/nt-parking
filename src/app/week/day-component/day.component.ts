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

  dayOfTheWeek = new Date();
  btnState: boolean = false;
  btnText: string = 'SUBSCRIBE PARKING';
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

  toggleBtn() {
    if (this.btnState) {
      this.btnText = 'SUBSCRIBE PARKING';
    } else {
      this.btnText = 'UNSUBSCRIBE PARKING';
    }
    this.btnState = !this.btnState;
  }
}
