import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IUser } from '../users/users.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  constructor(private $http: HttpClient, private router: Router) {}

  public currentUser: IUser = !!localStorage.currentUser
    ? JSON.parse(localStorage.currentUser)
    : null;

  loginUser(email: string, password: string): Observable<IUser> {
    const loginInfo = { email: email, password: password };

    return this.$http.post<IUser>('login', loginInfo).do(response => {
      if (response) {
        this.currentUser = <IUser>response;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
    });
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAdmin() {
    return this.isAuthenticated() && this.currentUser.admin;
  }

  logout() {
    this.currentUser = undefined;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
