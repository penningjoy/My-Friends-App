import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Friend } from '../Friend';
import { FriendService } from '../friend.service';


@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.css']
})
export class FriendDetailComponent implements OnInit {
  /* friend property must be an input property, annotated with a decorator @input decorator.*/
  @Input() friend: Friend;

  constructor(
              private route: ActivatedRoute,
              private friendService: FriendService,
              private location: Location
             ) { }

  ngOnInit() {
    this.getFriend();
  }

  getFriend(): void {
     const id = +this.route.snapshot.paramMap.get('id');
     this.friendService.getFriend(id).subscribe(friend => this.friend = friend );
  }

  //  persists friend changes and callback function calls the goback() function
  save(): void {
    this.friendService.updateFriend(this.friend).subscribe(() => this.goback());
  }

  goback(): void {
    this.location.back();
  }
}
