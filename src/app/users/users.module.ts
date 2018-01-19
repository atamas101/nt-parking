import { NgModule } from '@angular/core';

import { NtmaterialModule } from '../ntmaterial/ntmaterial.module';
import { UsersComponent } from './users-list.component';
import { UsersService } from './users.service';
import { PaginationComponent } from '../shared/pagination.component';

import { UserModifierComponent } from '../user-modifier/user-dialog.component';
import { DialogWrapper } from '../user-modifier/dialog-wrapper.component';
import { UserModifierForm } from '../user-modifier/edit-user-form.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserModifierComponent,
    DialogWrapper,
    UserModifierForm,
    PaginationComponent
  ],
  exports: [
    UsersComponent,
    UserModifierComponent,
    DialogWrapper,
    UserModifierForm,
    PaginationComponent
  ],
  entryComponents: [UserModifierComponent, DialogWrapper, UserModifierForm],
  imports: [NtmaterialModule],
  providers: [UsersService]
})
export class UsersModule {}
