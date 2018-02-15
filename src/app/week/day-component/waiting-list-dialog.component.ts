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
  @Input() selectedDay;
  @Input() waitingList;
  @Input() othersCount;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(WaitingListContentComponent, {
      data: { selectedDay: this.selectedDay, people: this.waitingList },
      minWidth: '70vw'
    });
  }
}
