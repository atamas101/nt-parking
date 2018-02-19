import { Component, Inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatInputModule,
  MatTableDataSource
} from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';
import { IUser } from '../../users/users.model';

@Component({
  selector: 'subscribers-list',
  templateUrl: 'subscribers-list.html'
})
export class SubscribersListComponent implements OnInit {
  public alocatedList: MatTableDataSource<IUser>;
  public othersList: MatTableDataSource<IUser>;
  public selectedDate: Date;

  public displayedColumns = ['name', 'hireDate', 'slotType'];

  constructor(
    public dialogRef: MatDialogRef<SubscribersListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.selectedDate = moment(this.data.day).toDate();
    const subscribers = [
      ...this.data.subscribers.alocated,
      ...this.data.subscribers.others
    ];

    this.alocatedList = new MatTableDataSource<IUser>(
      this.data.subscribers.alocated.map(item => {
        item.user.slotType =
          item.slotType === 1
            ? 'Underground'
            : item.slotType === 2 ? 'Outside' : '-';
        return item.user;
      })
    );
    if (this.data.subscribers.others.length) {
      this.othersList = new MatTableDataSource<IUser>(
        this.data.subscribers.others.map(item => {
          item.user.slotType =
            item.slotType === 1
              ? 'Underground'
              : item.slotType === 2 ? 'Outside' : '-';
          return item.user;
        })
      );
    }
    // this.data.subscribers.others = this.data.subscribers.others.map(item => {
    //   item.hireDate = moment(item.hireDate)
    //     .utc()
    //     .startOf('day')
    //     .add(12, 'hour')
    //     .toDate();
    //   return item;
    // });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
