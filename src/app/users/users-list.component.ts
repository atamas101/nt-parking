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
  displayedColumns = ['name', 'hireDate', 'email', 'edit'];
  errorMessage: String;
  @ViewChild(MatSort) sort: MatSort;
  private usersArr;
  constructor(private users: UsersService) {}
  //constructor(private http: HttpClient) {}

  ngOnInit() {
    this.users.getUsers();
    console.log(this.usersArr, 'uytgyutyrdtr');
    //this.usersList = new MatTableDataSource<IUsers>(usersArr);
  }

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim();
  //   filterValue = filterValue.toLowerCase();
  //   this.usersList.filter = filterValue;
  // }

  // ngAfterViewInit() {
  //   this.usersList.sort = this.sort;
  // }

  // addEditHandler(newUser) {
  //   this.usersList = new MatTableDataSource<IUsers>(this.users.getUsers());
  // }
}
