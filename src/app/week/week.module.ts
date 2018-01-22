import { SlotComponent } from './slot-component/slot.component';
import { DayComponent } from './day-component/day.component';
import { WeekViewComponent } from './week-view.component';
import { WeekNavComponent } from './week-nav/week-nav.component';

import { NgModule } from '@angular/core';

import { NtmaterialModule } from '../ntmaterial/ntmaterial.module';

@NgModule({
  declarations: [
    WeekViewComponent,
    WeekNavComponent,
    DayComponent,
    SlotComponent
  ],

  imports: [NtmaterialModule]
})
export class WeekModule {}
