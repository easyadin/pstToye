import { MediaService } from './../../services/media.service';
import { AudioService } from './../../services/audio.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Media } from 'src/app/model/media';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit, OnDestroy {
  constructor(
    private audioService: AudioService,
    private mediaService: MediaService,
    private menu: MenuController
  ) { }

  audioSub: Subscription;
  audioList: Media[] = [];

  // counter
  pending = 0;
  published = 0;
  counterSub: Subscription;

  ionViewWillEnter() {
    this.menu.enable(true)
  }
  
  ngOnInit() {
    this.menu.enable(true)

    this.audioSub = this.audioService.audioSubject.subscribe(
      medialist => {
        this.audioList = medialist
      }
    )
    this.audioService.fetchAudio();

    // get counters
    this.counterSub = this.mediaService.CounterSubject.subscribe(counter => {
      this.pending = counter.pending.length
      this.published = counter.published.length
    })
    this.mediaService.getCounter('Audio');
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


  ngOnDestroy(): void {
    this.audioSub.unsubscribe();
    this.counterSub.unsubscribe();
  }

}
