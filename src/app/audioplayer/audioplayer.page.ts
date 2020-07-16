import { MediaService } from 'src/app/services/media.service';
import { StreamService } from './../services/stream.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonRange, NavController, MenuController } from "@ionic/angular";
import { ActivatedRoute } from '@angular/router';
import { Media } from '../model/media';
import { AudioService } from '../services/audio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.page.html',
  styleUrls: ['./audioplayer.page.scss'],
})
export class AudioplayerPage implements OnInit, OnDestroy {
  constructor(
    private menu: MenuController,
    private audioService: AudioService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private streamService: StreamService,
    private mediaService: MediaService
  ) {

    // listen to stream state
    this.streamService.getState().subscribe(state => {
      this.state = state;
    });
  }

  @ViewChild("range", { static: false }) range: IonRange;

  // state to capture streaming state
  state;
  RetrievedAudio: Media;

  audioSub: Subscription;

  ngOnInit() { }

  ionViewWillEnter() {
    // get id of audio passed in query
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/tabs/home');
        return;
      }

      // retrieve audio 
      this.RetrievedAudio = this.audioService.getAudio(paramMap.get('id'))
      // play audio
      try {
        this.streamService.playAudio(this.RetrievedAudio);
      } catch (error) {
        console.log(error)
      }

    })
  }

  ionViewDidEnter() {
    // get id of audio passed in query
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/tabs/home');
        return;
      }

      // retrieve audio 
      this.audioSub = this.audioService.audioSubject.subscribe(media => {
        this.RetrievedAudio = media.find(m => m.id === paramMap.get('id'))

        // play audio
        try {
          this.streamService.playAudio(this.RetrievedAudio);
        } catch (error) {
          console.log(error)
        }
      })
      this.streamService.playAudio(this.RetrievedAudio);
    })
  }

  // play audio
  play() {
    this.streamService.play();
  }
  // play next
  playNext() {
    this.streamService.playNext();
  }
  // play prev
  playPrev() {
    this.streamService.playPrev();
  }
  // pause current stream
  pause() {
    this.streamService.pause();
  }
  // on touch ion-range
  touchStart() {
    this.streamService.touchStart(this.range)
  }
  // on move ion-range
  // update current seconds text
  touchMove() {
    this.streamService.touchMove(this.range)
  }
  // on touch release/end
  touchEnd() {
    this.streamService.touchEnd(this.range)
  }

  // like audio
  onLike() {
    // this.audioService.Like(this.state.id)
  }
  // comment
  onComment() {
    // this.audioService.Comment(this.state.id)
  }
  // share
  onShare() {
    // this.audioService.Share(this.state.id)
  }
  // download audio
  onDownload() {
    this.mediaService.Download(this.RetrievedAudio)
  }

  ngOnDestroy() {
    this.audioSub.unsubscribe();
  }
}
