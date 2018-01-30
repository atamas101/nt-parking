import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { UsersService } from './users.service';
import { IUser } from './users.model';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatInputModule
} from '@angular/material';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersComponent implements OnInit {
  public usersList: any;
  displayedColumns = ['name', 'hireDate', 'email', 'edit'];
  errorMessage: String;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private users: UsersService) {}

  ngOnInit() {
    this.usersList = new MatTableDataSource<IUser>();
    this.users.getUsers().subscribe(user => {
      this.usersList.data = user;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.usersList.filter = filterValue;
  }

  ngAfterViewInit() {
    this.usersList.sort = this.sort;
  }

  addEditHandler(newUser) {
    console.log('From user list', newUser);
    this.users.getUsers().subscribe(user => {
      this.usersList.data = user;
    });
  }
}
