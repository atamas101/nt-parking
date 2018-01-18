import { Component, Input } from '@angular/core';
import { UserModifierContentComponent } from './user-modifier-content.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'user-modifier-form',
  templateUrl: './user-modifier-form.html'
})
export class UserModifierForm {
  @Input() userToEdit;
  constructor(public dialogRef: MatDialogRef<UserModifierContentComponent>) {}
  onCancel() {
    this.dialogRef.close();
    console.log('lulu');
  }
  onSubmit(e) {
    e.preventDefault();
  }
}
