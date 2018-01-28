import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UpdateUserComponent } from './dialog-update-user.component';
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
    let dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '50vw',
      data: this.selectedUser ? this.selectedUser : {}
    });

    dialogRef
      .afterClosed()
      .filter(rez => rez)
      .subscribe(result => {
        console.log(
          'The dialog was closed and fotrm data is in the result',
          result
        );
        this.deliverUpdatedUser.emit(result);
      });
  }
}
