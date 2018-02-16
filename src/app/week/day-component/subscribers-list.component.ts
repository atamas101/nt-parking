import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'subscribers-list',
  templateUrl: 'subscribers-list.html',
  styleUrls: ['./waiting-list-content.scss']
})
export class SubscribersListComponent {
  constructor(
    public dialogRef: MatDialogRef<SubscribersListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
