import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NtmaterialModule } from './ntmaterial/ntmaterial.module';
import { LoginComponent } from './login/login.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { UsersModule } from './users/users.module';
import { WeekModule } from './week/week.module';
@NgModule({
  declarations: [AppComponent, LoginComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NtmaterialModule,
    UsersModule,
    WeekModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
