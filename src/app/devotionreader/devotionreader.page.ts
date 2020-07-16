import { Devotional } from 'src/app/model/media';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { MediaService } from '../services/media.service';
import { DevotionalService } from '../services/devotional.service';

@Component({
  selector: 'app-devotionreader',
  templateUrl: './devotionreader.page.html',
  styleUrls: ['./devotionreader.page.scss'],
})
export class DevotionreaderPage implements OnInit {
  constructor(private mediaService: MediaService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private menu: MenuController,
    private devotionalService: DevotionalService
  ) { }

  retrievedDevotion: Devotional

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/tabs/Devotional');
        return;
      }

      // retrieve devotion
      this.retrievedDevotion = this.devotionalService.getDevotion(paramMap.get('id'))
    })
  }

}
