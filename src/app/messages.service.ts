import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: string[] = [];
  constructor() { }

  addmessage(message: string) {
     this.messages.push(message);
  }

  clearmessage() {
    this.messages = [];
  }

}
