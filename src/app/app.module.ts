import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NtmaterialModule } from './ntmaterial/ntmaterial.module';
import { UsersComponent } from './users/users-list.component';
import { UsersService } from './users/users.service';

@NgModule({
  declarations: [AppComponent, UsersComponent],

  imports: [BrowserModule, BrowserAnimationsModule, NtmaterialModule],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
