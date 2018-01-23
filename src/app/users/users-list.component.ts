import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { UsersService } from './users.service';
import { IUsers } from './users.model';
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
  displayedColumns = ['id', 'lastName', 'firstName', 'hireDate', 'edit'];
  value = 'Clear me';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private users: UsersService) {}

  ngOnInit() {
    this.usersList = new MatTableDataSource<IUsers>(this.users.getUsers());
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.usersList.filter = filterValue;
  }

  ngAfterViewInit() {
    this.usersList.paginator = this.paginator;
    this.usersList.sort = this.sort;
  }

  addEditHandler(newUser) {
    // let usersArr = this.usersList.filteredData;
    // console.log(usersArr);
    // let check = usersArr.filter(newUser => newUser.id);
    // if (check.length > 0) {
    //   usersArr.map(
    //     user =>
    //       user.id === newUser.id ? (user = Object.assign({}, newUser)) : ''
    //   );
    //   this.usersList.filteredData = usersArr;
    // } else {
    //   this.usersList.filteredData.push(newUser);
    // }
    this.usersList = new MatTableDataSource<IUsers>(this.users.getUsers());
  }
}
