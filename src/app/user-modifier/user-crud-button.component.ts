import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogWrapper } from './dialog-wrapper.component';
import { UserModifierForm } from './edit-user-form.component';

@Component({
  selector: 'user-crud-button',
  template: `<button mat-raised-button (click)="openDialog()">{{btnType || "Please specify the btnType"}}</button>`
})
export class UserCrudBtn {
  @Input() selectedUser;
  @Input() btnType;
  newUser: {} = {};
  constructor(public dialog: MatDialog) {}

  openDialog(potentialUser = {}): void {
    let dialogRef = this.dialog.open(DialogWrapper, {
      width: '50vw',
      data: this.selectedUser ? this.selectedUser : {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed and form data is in the result');
      this.newUser = result;
    });
  }
}
