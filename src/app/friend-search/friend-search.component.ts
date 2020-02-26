import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Friend } from '../Friend';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-friend-search',
  templateUrl: './friend-search.component.html',
  styleUrls: ['./friend-search.component.css']
})
export class FriendSearchComponent implements OnInit {
  friends$: Observable<Friend[]>;
  private searchTerms = new Subject<string>();

  constructor(private friendService: FriendService) { }

  // push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.friends$ = this.searchTerms.pipe(
      debounceTime(300), // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore new term if same as previous term
      switchMap((term: string) => this.friendService.searchFriends(term)),
    );
  }

}

/*  --- Notes ---
* -> switchMap() calls the search service for each search term that makes it through debounce()
* and distinctUntilChanged(). It cancels and discards previous search observables, returning only
* the latest search service observable.
* With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call.
* Even with a 300ms pause between requests, you could have multiple HTTP requests in flight and they may not return in the order sent.
* switchMap() preserves the original request order while returning only the observable from the most recent HTTP method call.
* Results from prior calls are canceled and discarded.
* Note that canceling a previous searchFriends() Observable doesn't actually abort a pending HTTP request.
* Unwanted results are simply discarded before they reach your application code.
*/
