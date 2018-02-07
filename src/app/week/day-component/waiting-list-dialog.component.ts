import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WaitingListContentComponent } from './waiting-list-content.component';

@Component({
  selector: 'waiting-list-display',
  template:
    '<button (mouseenter)="openDialog()">...{{othersCount}} more waiting</button>',
  styles: [
    `button {
      background:none;
      color:inherit;
      border:none; 
      padding:0;
      font: inherit;
      cursor: pointer;
 }`
  ]
})
export class WaitingListDialogComponent {
  @Input() othersCount;
  @Input() waitingList;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    console.log(this.waitingList);
    let dialogRef = this.dialog.open(WaitingListContentComponent, {
      width: '200px',
      data: this.waitingList
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The waiting list dialog was closed');
    });
  }
}
