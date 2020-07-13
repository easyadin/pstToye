import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit {
  constructor(private menu: MenuController,
    private platform: Platform) { }

  ngOnInit() {

    this.platform.is('mobile') ? ''
      : this.menu.enable(true, 'adminSideMenu'),
      this.menu.open('adminSideMenu')
  }


}
