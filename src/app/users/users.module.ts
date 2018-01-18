import { NgModule } from '@angular/core';

import { NtmaterialModule } from '../ntmaterial/ntmaterial.module';
import { UsersComponent } from './users-list.component';
import { UsersService } from './users.service';
@NgModule({
  declarations: [UsersComponent],
  exports: [UsersComponent],
  imports: [NtmaterialModule],
  providers: [UsersService]
})
export class UsersModule {}
