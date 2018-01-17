import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NtmaterialModule } from './ntmaterial/ntmaterial.module';

import { WeekViewComponent } from './week-view-wrapper/week-view.component';
import { WeekNavComponent } from './week-view-wrapper/week-nav.component';

import { DayComponent } from './week-view-wrapper/day-component/day.component';

@NgModule({
  declarations: [AppComponent, WeekViewComponent, WeekNavComponent, DayComponent],
  imports: [BrowserModule, BrowserAnimationsModule, NtmaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
