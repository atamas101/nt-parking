import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WaitingListContentComponent } from './waiting-list-content.component';

@Component({
  selector: 'waiting-list-display',
  template:
    '<button (mouseenter)="openDialog()" (mouseleave)="requestClose()" >...{{othersCount}} more waiting</button>',
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
  closeDialog = false;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    console.log(this.waitingList);
    let dialogRef = this.dialog.open(WaitingListContentComponent, {
      width: '200px',
      data: { people: this.waitingList, close: this.closeDialog }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The waiting list dialog was closed');
    });
  }
  requestClose() {
    this.closeDialog = true;
  }
}
