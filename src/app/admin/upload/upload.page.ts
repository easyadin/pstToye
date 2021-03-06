import { ActivatedRoute } from '@angular/router';
import { MediaService } from './../../services/media.service';
import { Component, OnInit, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit, OnDestroy {
  constructor(private mediaService: MediaService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private menu: MenuController
  ) { }


  mediaType;
  mediaDetail;
  uploadPercentage;
  uploadingPercentage;

  percentageSubscription: Subscription;

  ionViewWillEnter() {
    this.menu.enable(true)
  }
  
  ngOnInit() {
    this.menu.enable(true)
    this.route.paramMap.subscribe(paramap => {
      if (!paramap.has('id')) {
        this.navCtrl.navigateBack('/audio'); // replace this with dashboard /admin
        return;
      }
      this.mediaType = paramap.get('id')
    })

    this.percentageSubscription = this.mediaService.downloadPercentageSubject.subscribe(
      percent => {
        this.uploadPercentage = percent
        this.uploadPercentage = this.uploadPercentage / 100;
        this.uploadingPercentage = Math.floor(percent)
      }
    )
  }


  onFileInput(event) {
    this.mediaDetail = event.target.files[0]
  }

  onSubmit(form) {
    if (this.mediaType == "Quote" || this.mediaType == "Devotional") {
      this.mediaService.uploadMessage(form, this.mediaType)
    }
    else {
      this.mediaService.uploadMedia(form, this.mediaType, this.mediaDetail)
    }
  }

  ngOnDestroy() {
    this.percentageSubscription.unsubscribe();
  }
}
