import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { UsersService } from './users.service';
import { IUser } from './users.model';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatInputModule
} from '@angular/material';

import { AuthenticationService } from '../login/auth.service';
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  public usersList: any;
  displayedColumns = ['name', 'hireDate', 'email', 'edit'];
  errorMessage: String;

  public verifyAdmin: string;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private users: UsersService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.usersList = new MatTableDataSource<IUser>();
    this.users.getUsers().subscribe(user => {
      this.usersList.data = user;
    });
    if (!this.auth.isAdmin()) {
      this.verifyAdmin = "none";
    }
    else {
      this.verifyAdmin = "";
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.usersList.filter = filterValue;
  }

  ngAfterViewInit() {
    this.usersList.sort = this.sort;
  }

  refreshUser(newUser) {
    this.users.getUsers().subscribe(user => {
      this.usersList.data = user;
    });
  }

}

