import { SubscribersService } from './../subscribers.service';
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
  constructor(private _subscribersService: SubscribersService) {}
  @Input() inputDay: Moment;
  // @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  othersNumber: number;
  subscribers;
  subscribeBtnState: boolean = true;

  ngOnInit() {
    this.subscribers = this._subscribersService.getSubscribers();
    this.othersNumber = this.subscribers.others.length;
  }

  subscribeBtnToggle(parkLocation) {
    this.subscribeBtnState = !this.subscribeBtnState;
    console.log('subscribe:', this.subscribeBtnState, 'location', parkLocation);
    console.log(moment(this.inputDay).toDate());
  }
}
