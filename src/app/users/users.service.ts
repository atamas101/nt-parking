import { Injectable } from '@angular/core';
import { IUsers } from './users.model';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UsersService {
  private _url = 'http://localhost:7777/api/';

  constructor(private _http: Http) {}

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  getUsers(): Observable<IUsers[]> {
    /* GET */
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let getURL = `${this._url}users`;

    return this._http
      .get(getURL, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  addEditUser(newUser: IUsers) {
    /* POST */
    let postUrl;
    if (newUser._id) {
      postUrl = `${this._url}user/${newUser._id}`;
    } else {
      postUrl = `${this._url}user/register`;
    }
    console.log(postUrl);
    return this._http
      .post(postUrl, newUser)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
}
