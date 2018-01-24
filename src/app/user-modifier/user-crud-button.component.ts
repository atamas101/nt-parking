import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogWrapper } from './dialog-wrapper.component';
import 'rxjs/add/operator/filter';
import { EventEmitter } from '@angular/core';

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
    let dialogRef = this.dialog.open(DialogWrapper, {
      width: '50vw',
      data: this.selectedUser ? this.selectedUser : {}
    });

    dialogRef
      .afterClosed()
      .filter(rez => rez)
      .subscribe(result => {
        console.log('The dialog was closed and fotrm data is in the result');
        // this.newUser = result;
        // console.log(this.newUser);
        this.deliverUpdatedUser.emit(result);
      });
  }
}
