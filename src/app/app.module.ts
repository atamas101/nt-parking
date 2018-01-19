import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NtmaterialModule } from './ntmaterial/ntmaterial.module';

import { UsersComponent } from './users/users-list.component';
import { UsersService } from './users/users.service';
import { UserModifierComponent } from './user-modifier/user-dialog.component';
import { DialogWrapper } from './user-modifier/dialog-wrapper.component';
import { UserModifierForm } from './user-modifier/edit-user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserModifierComponent,
    DialogWrapper,
    UserModifierForm
  ],

  imports: [BrowserModule, BrowserAnimationsModule, NtmaterialModule],
  entryComponents: [UserModifierComponent, DialogWrapper, UserModifierForm],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
