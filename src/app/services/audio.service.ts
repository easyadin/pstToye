import { Injectable } from '@angular/core';
import { Media } from '../model/media';

@Injectable({
  providedIn: 'root'
})

// play | pause | next | prev | share | download | comment | seekTo | getAlbumsList | getAudioList
export class AudioService {
  constructor() { }

  private _audioList: Media[] = [
    new Media(
      "1",
      "pstf",
      "Tomorrow",
      "Pastor Toye",
      "audio",
      "https://www.bensound.com/bensound-music/bensound-tomorrow.mp3",
      "https://www.bensound.com/bensound-music/bensound-tomorrow.mp3",
      "",
      "",
      "false",
      "false",
      false
    ),
    new Media(
      "2",
      "pstf",
      "Buddy",
      "Pastor Toye",
      "audio",
      "https://www.bensound.com/bensound-music/bensound-buddy.mp3",
      "https://www.bensound.com/bensound-music/bensound-buddy.mp3",
      "",
      "",
      "false",
      "false",
      false
    ),
    new Media(
      "3",
      "pstf",
      "Freedom",
      "Pastor Toye",
      "audio",
      "https://www.bensound.com/bensound-music/bensound-freedom.mp3",
      "https://www.bensound.com/bensound-music/bensound-freedom.mp3",
      "",
      "",
      "false",
      "false",
      false
    )
  ];

  get AudioList() {
    return [...this._audioList]
  }

  getAudio(id: string) {
    return { ...this._audioList.find(a => a.id === id) }
  }

  //====== Post to api ======
  // like audio
  Like(id) {

  }
  // comment
  Comment(id) {

  }
  // share
  Share(id) {

  }
  // download audio
  Download(id) {

  }
}
