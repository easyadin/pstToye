import { Component, OnInit } from '@angular/core';
import { Media } from '../model/media';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  constructor(private audioService: AudioService) { }

  audioList: Media[] = [];
  isToggle = 'all';

  segmentChanged(ev: any) {
    this.isToggle = ev.target.value;
  }

  ngOnInit() {
    this.audioList = this.audioService.AudioList;
  }
}
