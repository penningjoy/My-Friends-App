/* Importing component symbol from Angular core library */
import { Component, OnInit } from '@angular/core';

import { FRIENDS } from '../mock-friends';
import { Friend } from '../Friend';
import { FriendService } from '../friend.service';
import { MessagesService } from '../messages.service';

/* Annotate the component class with @component.
 * @component is the decorator that specifies metadata for angular component.
 * 1. component's css element selector *
 * 2. location of the component's template file *
 * 3. location of the component's private css styles */

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})

export class FriendsComponent implements OnInit {
  friends: Friend[];
  selectedFriend: Friend;
  constructor(private friendservice: FriendService, private messasgesservice: MessagesService) {}

  /* ngOnInit is a lifecycle hook -> angular calls ngOnInit() shortly after creating a component.
   * Good Place to put initialization logic */
  ngOnInit() {
    this.getFriends();
  }
  getFriends(): void {
    /* this.friends = this.friendservice.getFriends(); */
    /* Since the getFriends is now returning an observable */
    this.friendservice.getFriends().subscribe(friends => this.friends = friends);

  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    // When the given name is non-blank, the handler creates a Friend-like object from the name
    // (it's only missing the id) and passes it to the services addFriend() method.
    this.friendservice.addFriend({ name } as Friend).subscribe(friend => this.friends.push(friend));
  }

  delete(friend: Friend): void {
    // removes the friend from the list anticipating a removal from the database as well by the server
    this.friends = this.friends.filter(f => f !== friend );
    this.friendservice.deleteFriend(friend).subscribe();
  }

  /*
  onSelect(friend: Friend): void {
     this.selectedFriend = friend;
     this.messasgesservice.addmessage(`Selected friend id : ${friend.id}`);
  }
  */
}

/*    ---- Notes ----
   Use of Observable will make the component wait for the array of friends to be
   emitted by the getFriends method from the friends service. The subscribe method
   passes the emitted array of heroes to the callback, which sets the component's
   heroes property.
*/
