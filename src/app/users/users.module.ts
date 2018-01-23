import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NtmaterialModule } from '../ntmaterial/ntmaterial.module';

import { UsersComponent } from './users-list.component';
import { UsersService } from './users.service';

import { UserCrudBtn } from '../user-modifier/user-crud-button.component';
import { DialogWrapper } from '../user-modifier/dialog-wrapper.component';

@NgModule({
  declarations: [UsersComponent, UserCrudBtn, DialogWrapper],
  exports: [UsersComponent, UserCrudBtn, DialogWrapper],
  entryComponents: [UserCrudBtn, DialogWrapper],
  imports: [NtmaterialModule, FormsModule, ReactiveFormsModule],
  providers: [UsersService]
})
export class UsersModule {}
