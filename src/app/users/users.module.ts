import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NtmaterialModule } from '../ntmaterial/ntmaterial.module';

import { UsersComponent } from './users-list.component';
import { UsersService } from './users.service';

import { UserCrudBtn } from '../user-modifier/user-crud-button.component';
import { DialogWrapper } from '../user-modifier/dialog-wrapper.component';
import { UserModifierForm } from '../user-modifier/edit-user-form.component';
@NgModule({
  declarations: [UsersComponent, UserCrudBtn, DialogWrapper, UserModifierForm],
  exports: [UsersComponent, UserCrudBtn, DialogWrapper, UserModifierForm],
  entryComponents: [UserCrudBtn, DialogWrapper, UserModifierForm],
  imports: [NtmaterialModule, FormsModule, ReactiveFormsModule],
  providers: [UsersService]
})
export class UsersModule {}
