import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
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
  <i *ngIf="btnText ==='mode_edit'" class="material-icons button-icon" (click)="doDelete(selectedUser)">delete</i>`
})
export class UserCrudBtn {
  @Input() selectedUser;
  @Input() btnText;
  @Output() changedList: EventEmitter<any> = new EventEmitter();
  // newUser: {} = {};

  constructor(public dialog: MatDialog, private _usersService: UsersService) {}

  doDelete(selectedUser) {
    console.log(this.selectedUser);
    this._usersService.deleteUser(selectedUser).subscribe(result => {
      console.log(result, 'user deleted');
      this.changedList.emit(null);
    });
  }

  openDialog() {
    // console.log(this.btnText, 'Button text');
    let dialogRef = this.dialog.open(UpdateUserComponent, {
      data: this.selectedUser ? this.selectedUser : {}
    });

    dialogRef
      .afterClosed()
      .filter(rez => rez)
      .subscribe(result => {
        console.log(
          'The dialog was closed and form data is in the result',
          result
        );
        this.changedList.emit(result);
      });
  }
  //   // MediaQuery activation changes

  //   public dialogWidth: number;
  //   watcher: Subscription;
  //   constructor(media: ObservableMedia, public dialog: MatDialog) {
  //     this.watcher = media.subscribe((change: MediaChange) => {
  //       if (change.mqAlias === 'xs') {
  //         console.log('dimensiune noua:', change.mqAlias);
  //         this.switchDialogWidth(100);
  //       } else {
  //         console.log('dimensiune noua:', change.mqAlias);
  //         this.switchDialogWidth(50);
  //       }
  //     });
  //   }
  //   ngOnDestroy() {
  //     this.watcher.unsubscribe();
  //   }
  //   switchDialogWidth(width) {
  //     this.dialogWidth = width;
  //   }
}
