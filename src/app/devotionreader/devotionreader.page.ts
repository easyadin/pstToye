import { Subscription } from 'rxjs';
import { Devotional } from 'src/app/model/media';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { MediaService } from '../services/media.service';
import { DevotionalService } from '../services/devotional.service';

@Component({
  selector: 'app-devotionreader',
  templateUrl: './devotionreader.page.html',
  styleUrls: ['./devotionreader.page.scss'],
})
export class DevotionreaderPage implements OnInit, OnDestroy {
  constructor(private mediaService: MediaService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private menu: MenuController,
    private devotionalService: DevotionalService
  ) { }



  retrievedDevotion: Devotional;
  devotionSub: Subscription;

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

  ionViewDidEnter() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/tabs/Devotional');
        return;
      }

      // retrieve devotion
      this.devotionSub = this.devotionalService.devotionalSubject.subscribe(
        devotionals => {
          this.retrievedDevotion = devotionals.find(d => d.id === paramMap.get('id'))
        })
    })
  }

  ngOnDestroy() {
    this.devotionSub.unsubscribe()
  }
}
