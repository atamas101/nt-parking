import { Component, Input } from '@angular/core';
import { DialogWrapper } from './dialog-wrapper.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'user-modifier-form',
  templateUrl: './edit-user-form.html'
})
export class UserModifierForm {
  @Input() userToEdit;
  private _newUser;
  constructor(public dialogRef: MatDialogRef<UserModifierForm>) {}
  onConfirmation() {
    this.dialogRef.close(this._newUser);
  }
  onCancel() {
    this.dialogRef.close();
  }
  onSubmit(formValues) {
    this._newUser = formValues;
    this.onConfirmation();
  }
}
