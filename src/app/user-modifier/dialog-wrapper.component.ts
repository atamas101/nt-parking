import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-wrapper.html'
})
export class DialogWrapper {
  constructor(
    public dialogRef: MatDialogRef<DialogWrapper>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {} //aka => INJECTED here, made available
}
