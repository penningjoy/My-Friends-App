import { Component, OnInit } from '@angular/core';

import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  /*  The messageservice property is kept public since it will also accessed outside of this class
   * ,in the html page. */
  constructor(public messagesservice: MessagesService) { }

  ngOnInit() {
  }


}
