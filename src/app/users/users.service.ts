import { Injectable } from '@angular/core';
import { IUser } from './users.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class UsersService {
  constructor(private $http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // This means a client-side or network error occured
      console.error('An error occured : ', error.error.message);
    } else {
      // Back-end returned an unsuccesfull response code
      // Check the response body for info on what went wrong
      alert(
        `Error code ${error.status}, ` +
          `error message : ${error.error['message']}`
      );
    }
    // return an ErrorObservable with a UI error message
    return new ErrorObservable('Something went wrong; please try again later');
  }

  getUsers(): Observable<IUser[]> {
    return this.$http.get<IUser[]>('users');
  }

  addEditUser(newUser: IUser): Observable<IUser> {
    const postUrl = newUser._id ? `user/${newUser._id}` : 'user/register';
    return this.$http
      .post<IUser>(postUrl, newUser)
      .pipe(catchError(this.handleError));
  }
  deleteUser(user: IUser): Observable<IUser> {
    console.log('from Service:', user);
    const deleteUrl = user._id ? `user/${user._id}` : 'user/register';
    return this.$http.delete<IUser>(deleteUrl);
  }
}
