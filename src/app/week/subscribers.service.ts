import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SubscribersService {
  constructor(private _http: HttpClient) {}

  private subscibersUrl = '';
  getSubscribers() {
    // :Observable<ISubscribers>
    // return this._http.get(this.subscribersUrl)
    // .map((res:Response) => res.json())
    // .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    return {
      alocated: [
        {},
        { name: 'Voicu Iulia', slot: 's2' },
        { name: '', slot: 's3' }
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
