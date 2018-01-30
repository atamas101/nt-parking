import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UpdateUserComponent } from './dialog-update-user.component';
import 'rxjs/add/operator/filter';
import { EventEmitter } from '@angular/core';

import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'user-crud-button',
  template: `<button mat-raised-button (click)="openDialog()">{{btnText || "Please specify the btnText"}}</button>`
})
export class UserCrudBtn {
  @Input() selectedUser;
  @Input() btnText;
  @Output() deliverUpdatedUser: EventEmitter<any> = new EventEmitter();
  // newUser: {} = {};
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(UpdateUserComponent, {
      // // MediaQuery activation changes
      // width: `${this.dialogWidth}vw`,
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
        this.deliverUpdatedUser.emit(result);
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
