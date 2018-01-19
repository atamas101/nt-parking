import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NtmaterialModule } from './ntmaterial/ntmaterial.module';
import { LoginComponent } from './login/login.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { WeekViewComponent } from './week-view-wrapper/week-view.component';
import { WeekNavComponent } from './week-view-wrapper/week-nav.component';
import { DayComponent } from './week-view-wrapper/day-component/day.component';
import { UsersModule } from './users/users.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WeekViewComponent,
    WeekNavComponent,
    DayComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NtmaterialModule,
    UsersModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
