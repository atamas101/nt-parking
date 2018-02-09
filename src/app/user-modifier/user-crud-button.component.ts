import { Component, Input, Output } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UpdateUserComponent } from './dialog-update-user.component';
import 'rxjs/add/operator/filter';
import { EventEmitter } from '@angular/core';

import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../login/auth.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'user-crud-button',
  template: `<i class="material-icons button-icon" (click)="openDialog()" >{{btnText}}</i>
  <i *ngIf="btnText ==='mode_edit'" class="material-icons button-icon" matTooltip="Delete User"  (click)="doDelete(selectedUser)">delete</i>`
})
export class UserCrudBtn {
  @Input() selectedUser;
  @Input() btnText;
  @Output() changedList: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private _usersService: UsersService,
    public snackBar: MatSnackBar
  ) {}

  doDelete(selectedUser) {
    console.log(this.selectedUser);
    this._usersService.deleteUser(selectedUser).subscribe(result => {
      console.log(result, 'user deleted');
      this.changedList.emit(null);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: this.selectedUser ? this.selectedUser : {}
    });

    dialogRef
      .afterClosed()
      .filter(rez => rez)
      .subscribe(result => {
        this.snackBar.open('User updated succesfully!', 'Dismiss', {
          duration: 4000
        });
        this.changedList.emit(result);
      });
  }
}
