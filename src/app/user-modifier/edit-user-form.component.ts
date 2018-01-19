import { Component, Input } from '@angular/core';
import { DialogWrapper } from './dialog-wrapper.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'user-modifier-form',
  templateUrl: './edit-user-form.html'
})
export class UserModifierForm {
  @Input() userToEdit;
  constructor(public dialogRef: MatDialogRef<DialogWrapper>) {}
  onConfirmation() {
    this.dialogRef.close();
  }
  onCancel() {
    this.dialogRef.close();
    console.log('lulu');
  }
  onSubmit(e) {
    e.preventDefault();
  }
}
