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
        id: 5,
        lastName: 'Popoviciu',
        firstName: 'Florin',
        hireDate: new Date(2017, 12, 17)
      },
      {
        id: 6,
        lastName: 'Miron',
        firstName: 'Costin',
        hireDate: new Date(2016, 10, 28)
      },
      {
        id: 7,
        lastName: 'Manole',
        firstName: 'Iulian',
        hireDate: new Date(2016, 12, 11)
      },
      {
        id: 8,
        lastName: 'Vasile',
        firstName: 'Vlad',
        hireDate: new Date(2017, 9, 9)
      },
      {
        id: 9,
        lastName: 'Miruna',
        firstName: 'Constantin',
        hireDate: new Date(2016, 3, 8)
      },
      {
        id: 10,
        lastName: 'Protopopescu',
        firstName: 'Sergiu',
        hireDate: new Date(2017, 7, 22)
      },
      {
        id: 11,
        lastName: 'Ignat',
        firstName: 'Florin',
        hireDate: new Date(2015, 11, 25)
      },
      {
        id: 12,
        lastName: 'Ionescu',
        firstName: 'Bianca',
        hireDate: new Date(2017, 10, 23)
      },
      {
        id: 13,
        lastName: 'Serban',
        firstName: 'Vlad',
        hireDate: new Date(2017, 12, 17)
      },
      {
        id: 14,
        lastName: 'Ioan',
        firstName: 'Septimiu',
        hireDate: new Date(2016, 10, 29)
      },
      {
        id: 15,
        lastName: 'Vanea',
        firstName: 'Cristi',
        hireDate: new Date(2017, 12, 16)
      }
    ];
  }
}