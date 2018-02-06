import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'waiting-list-content',
  templateUrl: 'waiting-list-content.html'
})
export class WaitingListContentComponent {
  constructor(
    public dialogRef: MatDialogRef<WaitingListContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
