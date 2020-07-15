import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { MediaService } from 'src/app/services/media.service';
import { Subscription } from 'rxjs';
import { Media } from 'src/app/model/media';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit, OnDestroy {
  constructor(
    private videoService: VideoService,
    private mediaService: MediaService,
  ) { }

  videoSub: Subscription;
  videoList: Media[] = [];

  // counter
  pending = 0;
  published = 0;
  counterSub: Subscription;

  ngOnInit() {
    this.videoSub = this.videoService.videoSubject.subscribe(
      medialist => {
        this.videoList = medialist
      }
    )
    this.videoService.fetchVideo();

    // get counters
    this.counterSub = this.mediaService.CounterSubject.subscribe(counter => {
      this.pending = counter.pending.length
      this.published = counter.published.length
    })
    this.mediaService.getCounter('Video');
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
    this.videoSub.unsubscribe();
    this.counterSub.unsubscribe();
  }

}
