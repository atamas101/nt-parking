import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UpdateUserComponent } from './dialog-update-user.component';
import 'rxjs/add/operator/filter';
import { EventEmitter } from '@angular/core';

import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../login/auth.service';

@Component({
  selector: 'user-crud-button',
  template: `<i class="material-icons button-icon"(click)="openDialog()">{{btnText}}</i>`
})
export class UserCrudBtn {
  @Input() selectedUser;
  @Input() btnText;
  @Output() deliverUpdatedUser: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(UpdateUserComponent, {
      data: this.selectedUser ? this.selectedUser : {}
    });

    dialogRef
      .afterClosed()
      .filter(rez => rez)
      .subscribe(result => this.deliverUpdatedUser.emit(result));
  }
}
