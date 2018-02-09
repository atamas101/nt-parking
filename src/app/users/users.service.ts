import { Injectable } from '@angular/core';
import { IUser } from './users.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  constructor(private $http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.$http.get<IUser[]>('users');
  }

  addEditUser(newUser: IUser): Observable<any> {
    const postUrl = newUser._id ? `user/${newUser._id}` : 'user/register';
    return this.$http.post<IUser>(postUrl, newUser);
  }

  deleteUser(user: IUser): Observable<IUser> {
    const deleteUrl = user._id ? `user/${user._id}` : 'user/register';
    return this.$http.delete<IUser>(deleteUrl);
  }
}
