import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'waiting-list-content',
  templateUrl: 'waiting-list-content.html',
  styleUrls: ['./waiting-list-content.scss']
})
export class WaitingListContentComponent {
  constructor(
    public dialogRef: MatDialogRef<WaitingListContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
