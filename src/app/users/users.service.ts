import { Injectable } from '@angular/core';
import { IUsers } from './users.model';

@Injectable()
export class UsersService {
  constructor() {}
  getUsers(): IUsers[] {
    return [
      {
        id: 1,
        lastName: 'Popovici',
        firstName: 'Sebastian',
        hireDate: new Date(2017, 12, 12)
      },
      {
        id: 2,
        lastName: 'Iacob',
        firstName: 'Rares',
        hireDate: new Date(2000, 10, 24)
      },
      {
        id: 3,
        lastName: 'Voicu',
        firstName: 'Iulia',
        hireDate: new Date(2015, 11, 20)
      },
      {
        id: 4,
        lastName: 'Marc',
        firstName: 'Ioana',
        hireDate: new Date(2016, 12, 15)
      },
      {
        id: 4,
        lastName: 'Popoviciu',
        firstName: 'Florin',
        hireDate: new Date(2017, 12, 17)
      }
    ];
  }
}
