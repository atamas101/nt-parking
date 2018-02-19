import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatInputModule,
  MatTableDataSource
} from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'subscribers-list',
  templateUrl: 'subscribers-list.html',
  styleUrls: ['./waiting-list-content.scss']
})
export class SubscribersListComponent implements OnInit {
  public subscribersList: any;

  constructor(
    public dialogRef: MatDialogRef<SubscribersListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    console.log(this.data.subscribers);
    this.subscribersList = new MatTableDataSource<any>();
    this.subscribersList.data = [
      ...this.data.subscribers.alocated,
      ...this.data.subscribers.others
    ];
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
