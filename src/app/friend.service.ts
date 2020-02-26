/* Components should not fetch data. They should be more concerned with displaying the data
 * and the presentation. Data fetching should be left to a Service.  */

import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Friend } from './Friend';
import { FRIENDS } from './mock-friends';
import { MessagesService } from './messages.service';

/* Injected at the root level. -> Angular will create a single, shared instance of friendService .
 * If it is not used at all, angular will remove it to optimize the app. */
@Injectable({
  providedIn: 'root'
})

export class FriendService {
  private friends: Friend[];
  private friendUrl = 'api/friends';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private messageservice: MessagesService) { }

  /* This method returns the array of friends */
  getFriends(): Observable<Friend[]> {
     this.messageservice.addmessage('Friends Service Reporting : Friends fetched!');

     return this.http.get<Friend[]>(this.friendUrl)
            .pipe(
               // RxJS tap() operator, which looks at the observable values, does something with those values, and passes them along
               tap(_ => this.log('fetched friends')),
               catchError(this.handleError<Friend[]>('getFriends', []))
            );

  }

  /* This method returns the friend based on the Id */
  getFriend(id: number): Observable<Friend> {
    const url = `${this.friendUrl}/${id}`;
    return this.http.get<Friend>(url).pipe(
       tap(_ => this.log('fetched friends')),
       catchError(this.handleError<Friend>(`getFriend id=${id}`))
    );
    /*
    // Todo:Send the message after fetching the friends
    this.messageservice.addmessage(`Friends Service Reporting : Friend fetched -> id: ${id} !`);
    return of(FRIENDS.find( friend => friend.id = id));
    */
  }

  /* This method updates a friend */
  updateFriend(friend: Friend): Observable<any> {
      return this.http.put(this.friendUrl, friend, this.httpOptions).pipe(
        tap(_ => this.log('fetched friends')),
        catchError(this.handleError<any>('updateFriend'))
      );
  }

 /* This method adds a friend */
 addFriend(friend: Friend): Observable<Friend> {
  return this.http.post(this.friendUrl, friend, this.httpOptions).pipe(
    tap((newFriend: Friend) => this.log(`added Fried with name : ${newFriend.name}`)),
    catchError(this.handleError<Friend>('addFriend'))
  );
 }

 /* This method deletes a friend */
 deleteFriend(friend: Friend | number): Observable<Friend> {
   const id  = typeof friend === 'number' ? friend : friend.id;
   const name = typeof friend === 'number' ? this.getFriend(friend) : friend.name;
   const url = `${this.friendUrl}/${id}`;

   return this.http.delete<Friend>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted friend name:${name}`)),
      catchError(this.handleError<Friend>('deleteFriend'))
  );
 }

 /* This method helps in searching by name */
 /*  This method also illustrates how to chain Observable operators together so we can minimize
  *  the number of similar HTTP requests and consume network bandwidth economically.
 */
 searchFriends(term: string): Observable<Friend[]> {
   const url = `${this.friendUrl}/?name=${term}`;
   if (!term.trim()) {
     // if no search term, return empty friends array.
     return of([]);
   }

   return this.http.get<Friend[]>(url)
   .pipe(
      tap(frnd => frnd.length ?
           this.log(`Found friends matching "${term}"`) :
           this.log('No such friend found!')),
      catchError(this.handleError<Friend[]>('searchFriends', []))
   );
 }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console for now.

      this.log(`${operation} failed: ${error.message}`);
     // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /** Log a FriendService message with the MessageService */
  private log(message: string) {
      this.messageservice.addmessage(`FriendService: ${message}`);
  }

}


/*            -- Notes --
  -------  Angular Services --------
We must make the friendService available to the dependency injection system before
Angular can inject it into the FriendsComponent by registering a provider.
A provider is something that can create or deliver a service; in this case,
it instantiates the friendService class to provide the service.
The service is registered with the INJECTOR and this object is responsible for choosing and
providing the service when the app requires it.
*/
