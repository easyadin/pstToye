import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-devotional',
  templateUrl: './devotional.page.html',
  styleUrls: ['./devotional.page.scss'],
})
export class DevotionalPage implements OnInit {
  constructor(private menu: MenuController,
    private platform: Platform) { }

  ngOnInit() {

    
  }


}
