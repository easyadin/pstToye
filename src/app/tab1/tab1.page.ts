import { NotificationsPage } from './../notifications/notifications.page';
import { Component } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor() {

  }

  dailyQuote = `In every #Sword there is a #Word. 
  Sword is #useless when it #lacks word. You don't have a sword if you lack
  the word`

  // update qoute

  getQuote(){
    
  }
}
