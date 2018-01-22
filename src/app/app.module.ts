import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NtmaterialModule } from './ntmaterial/ntmaterial.module';
import { LoginComponent } from './login/login.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { WeekViewComponent } from './week-view-wrapper/week-view.component';
import { WeekNavComponent } from './week-view-wrapper/week-nav.component';
import { DayComponent } from './week-view-wrapper/day-component/day.component';
import { UsersModule } from './users/users.module';
import { SlotComponent } from './week-view-wrapper/day-component/slot.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WeekViewComponent,
    WeekNavComponent,
    DayComponent,
    SlotComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NtmaterialModule,
    UsersModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
