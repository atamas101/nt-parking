import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NtmaterialModule } from '../ntmaterial/ntmaterial.module';

import { UsersComponent } from './users-list.component';
import { UsersService } from './users.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';

import { UserCrudBtn } from '../user-modifier/user-crud-button.component';
import { UpdateUserComponent } from '../user-modifier/dialog-update-user.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    UsersComponent,
    UserCrudBtn,
    UpdateUserComponent,
    PaginationComponent
  ],
  exports: [
    UsersComponent,
    UserCrudBtn,
    UpdateUserComponent,
    PaginationComponent
  ],
  entryComponents: [UpdateUserComponent],
  imports: [NtmaterialModule, BrowserModule, HttpModule],
  providers: [UsersService]
})
export class UsersModule {}
