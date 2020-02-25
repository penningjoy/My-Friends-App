import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

import { Friend } from './Friend';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const friends = [
      { id: 1, name: 'Sanjeet Sah'},
      { id: 2, name: 'Chirag Baweja'},
      { id: 3, name: 'Debadeep Pharikal'},
      { id: 4, name: 'Swagoto Roychowdhury'},
      { id: 5, name: 'Ghouse Pasha'}
    ];
    return {friends};
  }

  // Overrides the genId method to ensure that a friend always has an id.
  // If the friends array is empty,
  // the method below returns the initial number (11).
  // if the friends array is not empty, the method below returns the highest
  // friend id + 1.

  genId(friends: Friend[]): number {
    return friends.length > 0 ? Math.max(...friends.map(friend => friend.id)) + 1 : 11;
  }

}
