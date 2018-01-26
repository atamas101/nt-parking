import { Injectable } from '@angular/core';
import { IUsers } from './users.model';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class UsersService {
  private url = 'http://localhost:7777/api/users';
  private userList: IUsers;

  constructor(private _http: Http) {}

  getUsers(): any {
    console.log(this.url);
    return this._http
      .get(this.url)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
