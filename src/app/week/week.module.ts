import { SlotComponent } from './slot/slot.component';
import { DayComponent } from './day/day.component';
import { WeekComponent } from './week.component';
import { WeekNavComponent } from './week-nav/week-nav.component';

import { NgModule } from '@angular/core';

import { NtmaterialModule } from '../ntmaterial/ntmaterial.module';
import { ScheduleService } from './schedule.service';
import { SubscribersListComponent } from './subscribers/subscribers-list.component';

@NgModule({
  declarations: [
    WeekComponent,
    WeekNavComponent,
    DayComponent,
    SlotComponent,
    SubscribersListComponent
  ],
  entryComponents: [SubscribersListComponent],
  imports: [NtmaterialModule],
  providers: [ScheduleService]
})
export class WeekModule {}
