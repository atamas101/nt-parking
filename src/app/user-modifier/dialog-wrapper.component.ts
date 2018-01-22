import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-wrapper.html'
})
export class DialogWrapper {
  invalidBtn: boolean;
  constructor(
    public dialogRef: MatDialogRef<DialogWrapper>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {} //aka => INJECTED here, made available

  ngOnInit() {
    if (this.data !== {}) {
      this.invalidBtn = false;
    } else {
      this.invalidBtn = true;
    }
    console.log(this.data);
    console.log('Invalid btn: ', this.invalidBtn);
  }
  validateOkBtn(status) {
    this.invalidBtn = status;
    console.log('Invalid btn: ', this.invalidBtn);
  }
}
