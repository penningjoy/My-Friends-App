import { Component, OnInit } from '@angular/core';
import { Friend } from '../Friend';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  friends: Friend[] = [];

  constructor(private friendService: FriendService) { }

  ngOnInit() {
    this.getFriends();
  }

  getFriends(): void {
    this.friendService.getFriends().subscribe(
      friends => this.friends = friends.slice(1, 5)
    );
  }

}
