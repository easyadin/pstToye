import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { MediaService } from 'src/app/services/media.service';
import { Devotional } from 'src/app/model/media';
import { Subscription } from 'rxjs';
import { DevotionalService } from 'src/app/services/devotional.service';

@Component({
  selector: 'app-devotional',
  templateUrl: './devotional.page.html',
  styleUrls: ['./devotional.page.scss'],
})
export class DevotionalPage implements OnInit {
  constructor(private menu: MenuController,
    private devotionalService: DevotionalService,
    private mediaService: MediaService,
  ) { }

  devotionalList: Devotional[] = [];
  devotionalSub: Subscription

  // counter
  pending = 0;
  published = 0;
  counterSub: Subscription;

  ionViewWillEnter() {
    this.menu.enable(true)
  }
  
  ngOnInit() {
    this.devotionalSub = this.devotionalService.devotionalSubject.subscribe(
      quotes => {
        this.devotionalList = quotes
      }
    )
    this.devotionalService.fetchQuote();

    // get counters
    this.counterSub = this.mediaService.CounterSubject.subscribe(counter => {
      this.pending = counter.pending.length
      this.published = counter.published.length
    })
    this.mediaService.getCounter('Devotional');
  }

  onDelete(id, mediaType) {
    this.mediaService.delete(id, mediaType)
  }

  onUnpublish(id, mediaType) {
    this.mediaService.unPublish(id, mediaType)
  }

  onPublish(id, mediaType) {
    this.mediaService.publish(id, mediaType)
  }

  ngOnDestroy() {
    this.devotionalSub.unsubscribe();
  }


}
