import { Injectable } from '@angular/core';

@Injectable()
export class SubscribersService {
  constructor() {}
  subscribers = {
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
