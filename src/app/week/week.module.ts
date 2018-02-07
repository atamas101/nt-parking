import { SlotComponent } from './slot-component/slot.component';
import { DayComponent } from './day-component/day.component';
import { WeekViewComponent } from './week-view.component';
import { WeekNavComponent } from './week-nav/week-nav.component';

import { NgModule } from '@angular/core';

import { NtmaterialModule } from '../ntmaterial/ntmaterial.module';
import { SubscribersService } from './subscribers.service';
import { WaitingListDialogComponent } from './day-component/waiting-list-dialog.component';
import { WaitingListContentComponent } from './day-component/waiting-list-content.component';
import { MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [
    WeekViewComponent,
    WeekNavComponent,
    DayComponent,
    SlotComponent,
    WaitingListDialogComponent,
    WaitingListContentComponent
  ],
  entryComponents: [WaitingListDialogComponent, WaitingListContentComponent],
  imports: [NtmaterialModule, MatTooltipModule],
  providers: [SubscribersService]
})
export class WeekModule {}
