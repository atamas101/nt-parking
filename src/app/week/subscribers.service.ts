import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class SubscribersService {
  constructor(private _http: Http) {}
  getSubscribers() {
    return {
      alocated: [
        { name: 'Bintintan Alexandru', slot: 's1' },
        { name: 'Voicu Iulia', slot: 's2' },
        { name: 'Popoviciu Sebastian', slot: 's3' }
      ],
      others: [
        { name: 'Bintintan Alexandru', slot: 's1' },
        { name: 'Voicu Iulia', slot: 's2' },
        { name: 'Popoviciu Sebastian', slot: 's3' }
      ]
    };
  }
  addUserRequest() {
    //POST
  }
}
