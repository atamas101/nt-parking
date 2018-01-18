import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { UsersService } from './users.service';
import { IUsers } from './users.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersComponent implements OnInit {
  usersList: any;
  displayedColumns = ['id', 'lastName', 'firstName', 'hireDate'];
  constructor(private users: UsersService) {}
  ngOnInit() {
    this.usersList = new MatTableDataSource<IUsers>(this.users.getUsers());
    console.log(this.usersList);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.usersList.paginator = this.paginator;
  }
}
