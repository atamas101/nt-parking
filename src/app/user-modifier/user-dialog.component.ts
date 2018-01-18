import { Component } from "@angular/core";
import { MatDialog } from '@angular/material';
import { UserModifierContentComponent } from './user-dialog-content.component'

@Component({
    selector: 'user-modifier',
    template: `<button mat-raised-button (click)="openDialog()">Add user</button>
               <div [userDataFrom_ngForAKAuser]="user"> 
                    <button mat-raised-button (click)="openDialog(user)">Edit user</button> 
               </div>
              `
})
export class UserModifierComponent {
    newUser: {} = {};
    constructor(public dialog: MatDialog) { }

    openDialog(potentialUser): void {
        let dialogRef = this.dialog.open(UserModifierContentComponent, {
            width: '250px',
            data: potentialUser       //this data goes into the EDIT
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed and form data is in the result');
            this.newUser = result;    // whatever comes out of the add/edit form
        });
    }
}    