import { Injectable } from '@angular/core';
import { IUser } from './users.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UsersService {
  constructor(private $http: HttpClient) {}

  handleError(error: Response) {
    console.log('I caught a fish:', error);
    return Observable.throw(error.statusText);
  }

  getUsers(): Observable<IUser[]> {
    return this.$http.get<IUser[]>('users');
  }

  addEditUser(newUser: IUser): Observable<IUser> {
    const postUrl = newUser._id ? `user/${newUser._id}` : 'user/register';
    return this.$http.post<IUser>(postUrl, newUser);
  }
  deleteUser(user: IUser): Observable<IUser> {
    console.log('from Service:', user);
    const deleteUrl = user._id ? `user/${user._id}` : 'user/register';
    return this.$http.delete<IUser>(deleteUrl);
  }
}
