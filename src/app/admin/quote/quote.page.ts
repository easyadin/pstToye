import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-quote',
  templateUrl: './quote.page.html',
  styleUrls: ['./quote.page.scss'],
})
export class QuotePage implements OnInit {
  constructor(private menu: MenuController,
    private platform: Platform) { }

  ngOnInit() {

   
  }

}
