import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  constructor(private menu: MenuController,
    private platform: Platform) { }

  ngOnInit() {

    this.platform.is('mobile') ? ''
      : this.menu.enable(true, 'adminSideMenu'),
      this.menu.open('adminSideMenu')
  }

}
