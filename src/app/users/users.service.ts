import { Injectable } from '@angular/core';
import { IUsers } from './users.model';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class UsersService {
  // users: IUsers[] = [
  //   {
  //     id: 1,
  //     lastName: 'Popovici',
  //     firstName: 'Sebastian',
  //     hireDate: new Date(2017, 12, 12)
  //   },
  //   {
  //     id: 2,
  //     lastName: 'Iacob',
  //     firstName: 'Rares',
  //     hireDate: new Date(2000, 10, 24)
  //   },
  //   {
  //     id: 3,
  //     lastName: 'Voicu',
  //     firstName: 'Iulia',
  //     hireDate: new Date(2015, 11, 20)
  //   },
  //   {
  //     id: 4,
  //     lastName: 'Marc',
  //     firstName: 'Ioana',
  //     hireDate: new Date(2016, 12, 15)
  //   },
  //   {
  //     id: 5,
  //     lastName: 'Popoviciu',
  //     firstName: 'Florin',
  //     hireDate: new Date(2017, 12, 17)
  //   },
  //   {
  //     id: 6,
  //     lastName: 'Miron',
  //     firstName: 'Costin',
  //     hireDate: new Date(2016, 10, 28)
  //   },
  //   {
  //     id: 7,
  //     lastName: 'Manole',
  //     firstName: 'Iulian',
  //     hireDate: new Date(2016, 12, 11)
  //   },
  //   {
  //     id: 8,
  //     lastName: 'Vasile',
  //     firstName: 'Vlad',
  //     hireDate: new Date(2017, 9, 9)
  //   },
  //   {
  //     id: 9,
  //     lastName: 'Miruna',
  //     firstName: 'Constantin',
  //     hireDate: new Date(2016, 3, 8)
  //   },
  //   {
  //     id: 10,
  //     lastName: 'Protopopescu',
  //     firstName: 'Sergiu',
  //     hireDate: new Date(2017, 7, 22)
  //   },
  //   {
  //     id: 11,
  //     lastName: 'Ignat',
  //     firstName: 'Florin',
  //     hireDate: new Date(2015, 11, 25)
  //   },
  //   {
  //     id: 12,
  //     lastName: 'Ionescu',
  //     firstName: 'Bianca',
  //     hireDate: new Date(2017, 10, 23)
  //   },
  //   {
  //     id: 13,
  //     lastName: 'Serban',
  //     firstName: 'Vlad',
  //     hireDate: new Date(2017, 12, 17)
  //   },
  //   {
  //     id: 14,
  //     lastName: 'Ioan',
  //     firstName: 'Septimiu',
  //     hireDate: new Date(2016, 10, 29)
  //   },
  //   {
  //     id: 15,
  //     lastName: 'Vanea',
  //     firstName: 'Cristi',
  //     hireDate: new Date(2017, 12, 16)
  //   }
  // ];
  private url = 'http://localhost:7777/api/users';
  private userList;

  constructor(private _http: Http) {}

  getUsers(): any {
    console.log(this.url);
    return this._http
      .get(this.url)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      })
      .subscribe(data => {
        this.userList = data;
      });
  }

  // addEditUser(newUser: IUsers): Observable<IUsers> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });

  //   return this._http
  //     .post(this._url, JSON.stringify(newUser), options)
  //     .map((response: Response) => {
  //       return response.json();
  //     })
  //     .catch(this.handleError);
  // }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  // getUsers(): IUsers[] {
  //   return this.users;
  // }

  // addUser(newUser: IUsers) {
  //   /* POST */
  //   console.log(newUser);
  //   newUser.id = this.users.length + 1;
  //   this.users.push(newUser);
  //   /* faking an Ok reponse from the server, errors to be handled later*/
  //   return true;
  // }

  // editUser(newUserInfo: IUsers) {
  //   /* PUT */
  //   // console.log(newUserInfo);
  //   // NOT PUSH, SEARCH IN ARR
  //   this.users.push(newUserInfo);
  //   /* faking an Ok reponse from the server, errors to be handled later*/
  //   return newUserInfo;
  // }
}
