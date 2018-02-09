import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'delete-dialog',
  template: `<p>Are you sure you want to delete {{data.name}}?</p>
            <div fxLayout="row" fxLayoutAlign="space-between center">
                <button (click)="onClick('yes')">Yes</button>
                <button (click)="onClick('no')">No</button>
            </div>             
    `,
  styles: [
    `button {
                width: 70px;
                color: #19b798;
                background-color: #fff;
                border-color: #d3d6d8;
            }`
  ]
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onClick(selected): void {
    this.dialogRef.close(selected);
  }
}
