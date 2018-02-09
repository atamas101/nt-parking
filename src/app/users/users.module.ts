import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NtmaterialModule } from '../ntmaterial/ntmaterial.module';

import { UsersComponent } from './users-list.component';
import { UsersService } from './users.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';

import { UserCrudBtn } from '../user-modifier/user-crud-button.component';
import { UpdateUserComponent } from '../user-modifier/dialog-update-user.component';
import { ShowColumn } from './show-column.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { DeleteDialog } from '../user-modifier/delete-dialog.component';
@NgModule({
  declarations: [
    UsersComponent,
    UserCrudBtn,
    UpdateUserComponent,
    PaginationComponent,
    ShowColumn,
    DeleteDialog
  ],
  exports: [
    UsersComponent,
    UserCrudBtn,
    UpdateUserComponent,
    PaginationComponent,
    DeleteDialog
  ],
  entryComponents: [UpdateUserComponent, DeleteDialog],
  imports: [NtmaterialModule, BrowserModule, HttpModule],
  providers: [UsersService]
})
export class UsersModule {}
