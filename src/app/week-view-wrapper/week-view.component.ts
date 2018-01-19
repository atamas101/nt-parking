import { Component } from '@angular/core';
import { WeekNavComponent } from './week-nav.component';

@Component({
  selector: 'week-wrapper',
  templateUrl: './week-view.component.html'
})
export class WeekViewComponent {
  title = 'salut';
  public weekDays;

  myMethod(dataFromChild) {
    console.log('Data from child: ', dataFromChild);
    this.weekDays = dataFromChild;
  }
}
