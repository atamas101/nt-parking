import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'subscribers-list',
  templateUrl: 'subscribers-list.html',
  styleUrls: ['./waiting-list-content.scss']
})
export class SubscribersListComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SubscribersListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.data.people = this.data.people.map(item => {
      item.hireDate = moment(item.hireDate)
        .utc()
        .startOf('day')
        .add(12, 'hour')
        .toDate();

      return item;
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
