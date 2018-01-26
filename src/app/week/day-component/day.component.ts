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

@Component({
  selector: 'day-comp',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  constructor(private SubscribersService: SubscribersService) {}

  @Input() inputDay: Moment;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  public subscribers = this.SubscribersService.subscribers;
  subscribeBtnState: boolean = true;

  othersNumber = this.subscribers.others.length;

  subscribeBtnToggle(parkLocation) {
    this.subscribeBtnState = !this.subscribeBtnState;
    console.log('subscribe:', this.subscribeBtnState, 'location', parkLocation);
  }
}
