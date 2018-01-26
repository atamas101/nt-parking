import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { IUsers } from '../users/users.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  constructor(private _http: Http, private router: Router) {}

  _url = 'http://localhost:7777/api/login';
  public currentUser: IUsers = !!localStorage.currentUser
    ? JSON.parse(localStorage.currentUser)
    : null;

  loginUser(email: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let loginInfo = { email: email, password: password };

    return this._http
      .post(this._url, JSON.stringify(loginInfo), options)
      .do(resp => {
        if (resp) {
          this.currentUser = <IUsers>resp.json().user;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
      })
      .catch(error => {
        return Observable.of(false);
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
