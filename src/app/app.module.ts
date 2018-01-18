import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NtmaterialModule } from './ntmaterial/ntmaterial.module';

import { UsersComponent } from './users/users-list.component';
import { UsersService } from './users/users.service';
import { UserModifierComponent } from './user-modifier/user-modifier.component';
import { UserModifierContentComponent } from './user-modifier/user-modifier-content.component';
import { UserModifierForm } from './user-modifier/user-modifier-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserModifierComponent,
    UserModifierContentComponent,
    UserModifierForm
  ],

  imports: [BrowserModule, BrowserAnimationsModule, NtmaterialModule],
  entryComponents: [
    UserModifierComponent,
    UserModifierContentComponent,
    UserModifierForm
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
