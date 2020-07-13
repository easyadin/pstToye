import { StreamService } from './../services/stream.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRange, NavController, MenuController } from "@ionic/angular";
import { ActivatedRoute } from '@angular/router';
import { Media } from '../model/media';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.page.html',
  styleUrls: ['./audioplayer.page.scss'],
})
export class AudioplayerPage implements OnInit {
  constructor(
    private menu: MenuController,
    private audioService: AudioService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private streamService: StreamService) {

    // listen to stream state
    this.streamService.getState().subscribe(state => {
      this.state = state;
    });
  }

  @ViewChild("range", { static: false }) range: IonRange;

  // state to capture streaming state
  state;
  RetrievedAudio: Media;

  ngOnInit() {
    this.menu.enable(false, 'adminSideMenu');
    this.menu.close('adminSideMenu');
    // get id of audio passed in query
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/tabs/home');
        return;
      }

      this.RetrievedAudio = this.audioService.getAudio(paramMap.get('id'))
      // play audio
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
    this.audioService.Like(this.state.id)
  }
  // comment
  onComment() {
    this.audioService.Comment(this.state.id)
  }
  // share
  onShare() {
    this.audioService.Share(this.state.id)
  }
  // download audio
  onDownload() {
    this.audioService.Download(this.state.id)
  }

}
