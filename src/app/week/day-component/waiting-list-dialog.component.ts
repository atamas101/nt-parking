import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WaitingListContentComponent } from './waiting-list-content.component';

@Component({
  selector: 'waiting-list-display',
  template:
    '<button (click)="openDialog()">...{{othersCount}} more waiting</button>',
  styleUrls: ['./waiting-list-dialog.scss']
})
export class WaitingListDialogComponent {
  @Input() othersCount;
  @Input() waitingList;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    console.log(this.waitingList);
    let dialogRef = this.dialog.open(WaitingListContentComponent, {
      data: this.waitingList
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The waiting list dialog was closed');
    });
  }
}
