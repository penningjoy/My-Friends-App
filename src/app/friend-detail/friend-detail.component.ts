import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Friend } from '../Friend';
import { FriendService } from '../friend.service';
import { InputValidationService } from '../input-validation.service';


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
              private location: Location,
              private validationService: InputValidationService
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
    // Security: Validate friend name before saving
    if (!this.friend || !this.friend.name) {
      console.warn('Cannot save friend without a name');
      return;
    }

    const validation = this.validationService.validateFriendName(this.friend.name);
    if (!validation.isValid) {
      if (validation.error) {
        console.warn(validation.error);
      }
      return;
    }

    this.friend.name = this.friend.name.trim();
    this.friendService.updateFriend(this.friend).subscribe(() => this.goback());
  }

  goback(): void {
    this.location.back();
  }
}
