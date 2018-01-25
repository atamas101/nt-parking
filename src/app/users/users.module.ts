import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NtmaterialModule } from '../ntmaterial/ntmaterial.module';

import { UsersComponent } from './users-list.component';
import { UsersService } from './users.service';
import { PaginationComponent } from '../shared/pagination.component';

import { UserCrudBtn } from '../user-modifier/user-crud-button.component';
import { DialogWrapper } from '../user-modifier/dialog-wrapper.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    UsersComponent,
    UserCrudBtn,
    DialogWrapper,
    PaginationComponent
  ],
  exports: [UsersComponent, UserCrudBtn, DialogWrapper, PaginationComponent],
  entryComponents: [DialogWrapper],
  imports: [NtmaterialModule, BrowserModule, HttpModule],
  providers: [UsersService]
})
export class UsersModule {}
