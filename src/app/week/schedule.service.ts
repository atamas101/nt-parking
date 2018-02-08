import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ScheduleService {
  constructor(private $http: HttpClient) {}

  private subscibersUrl = '';
  getSubscribers() {
    // :Observable<ISchedule>
    // return this.$http.get(this.subscribersUrl)
    // .map((res:Response) => res.json())
    // .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    return {
      alocated: [
        {},
        { name: 'Voicu Iulia', slot: 's2' },
        { name: '', slot: 's3' }
      ],
      others: [
        { name: 'Iacob Rares', hireDate: 'Jan 7th 17', slot: 's1' },
        { name: 'Voicu Iulia', hireDate: 'Feb 7th 18', slot: 's2' },
        { name: 'Popoviciu Sebastian', hireDate: 'Nov 7th 18', slot: 's3' }
      ]
    };
  }
  getWeekSchedule(weekNumber: Number) {
    return this.$http.get('schedule/' + weekNumber);
  }
  parkToggle(data) {
    return this.$http.post('subscribe', data);
  }
}
