import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'dialog-content',
  templateUrl: './user-modifier-content.html'
})
export class UserModifierContentComponent {
  constructor(
    public dialogRef: MatDialogRef<UserModifierContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {} //aka => INJECTED here, made available

  onNoClick(): void {
    this.dialogRef.close();
  }
}
