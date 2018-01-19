import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogWrapper } from './dialog-wrapper.component';
import { UserModifierForm } from './edit-user-form.component';

@Component({
  selector: 'user-crud-button',
  template: `<button mat-raised-button (click)="openDialog()">Add user</button>`
})
export class UserCrudBtn {
  newUser: {} = {};
  constructor(public dialog: MatDialog) {}

  openDialog(potentialUser = {}): void {
    let dialogRef = this.dialog.open(DialogWrapper, {
      width: '50vw',
      data: {
        id: 3,
        lastName: 'Voicu',
        firstName: 'Iulia',
        hireDate: new Date(2015, 11, 20)
      } //this data goes into the EDIT
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed and form data is in the result');
      this.newUser = result; // whatever comes out of the add/edit form
      console.log(this.newUser);
    });
  }
}

//    <div [userDataFrom_ngForAKAuser]="user">
//         <button mat-raised-button (click)="openDialog(user)">Edit user</button>
//    </div>
