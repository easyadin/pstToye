import { Injectable } from '@angular/core';
import { Media } from '../model/media';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }

  private _videoList: Media[] = [
    new Media(
      "1",
      "pstf",
      "Tomorrow",
      "Pastor Toye",
      "audio",
      "../../assets/test.mp4",
      "pstToye\src\assets\test.mp4",
      "",
      "",
      "false",
      "false",
    ),
    new Media(
      "3",
      "pstf",
      "Freedom",
      "Pastor Toye",
      "audio",
      "https://vod-progressive.akamaized.net/exp=1593180300~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3149%2F15%2F390745576%2F1652742212.mp4~hmac=c69e6f40f647e052c5f46aca4d70470e3848f614e7aba68feeb7070b01e72a0d/vimeo-prod-skyfire-std-us/01/3149/15/390745576/1652742212.mp4?download=1&filename=production+ID%3A3722010.mp4",
      "https://vod-progressive.akamaized.net/exp=1593180300~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3149%2F15%2F390745576%2F1652742212.mp4~hmac=c69e6f40f647e052c5f46aca4d70470e3848f614e7aba68feeb7070b01e72a0d/vimeo-prod-skyfire-std-us/01/3149/15/390745576/1652742212.mp4?download=1&filename=production+ID%3A3722010.mp4",
      "",
      "",
      "false",
      "false",
    )
    ,
    new Media(
      "4",
      "pstf",
      "Freedom",
      "Pastor Toye",
      "audio",
      "https://vod-progressive.akamaized.net/exp=1593180300~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3149%2F15%2F390745576%2F1652742212.mp4~hmac=c69e6f40f647e052c5f46aca4d70470e3848f614e7aba68feeb7070b01e72a0d/vimeo-prod-skyfire-std-us/01/3149/15/390745576/1652742212.mp4?download=1&filename=production+ID%3A3722010.mp4",
      "https://vod-progressive.akamaized.net/exp=1593180300~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3149%2F15%2F390745576%2F1652742212.mp4~hmac=c69e6f40f647e052c5f46aca4d70470e3848f614e7aba68feeb7070b01e72a0d/vimeo-prod-skyfire-std-us/01/3149/15/390745576/1652742212.mp4?download=1&filename=production+ID%3A3722010.mp4",
      "",
      "",
      "false",
      "false",
    )
    ,
    new Media(
      "5",
      "pstf",
      "Freedom",
      "Pastor Toye",
      "audio",
      "https://vod-progressive.akamaized.net/exp=1593180300~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3149%2F15%2F390745576%2F1652742212.mp4~hmac=c69e6f40f647e052c5f46aca4d70470e3848f614e7aba68feeb7070b01e72a0d/vimeo-prod-skyfire-std-us/01/3149/15/390745576/1652742212.mp4?download=1&filename=production+ID%3A3722010.mp4",
      "https://vod-progressive.akamaized.net/exp=1593180300~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3149%2F15%2F390745576%2F1652742212.mp4~hmac=c69e6f40f647e052c5f46aca4d70470e3848f614e7aba68feeb7070b01e72a0d/vimeo-prod-skyfire-std-us/01/3149/15/390745576/1652742212.mp4?download=1&filename=production+ID%3A3722010.mp4",
      "",
      "",
      "false",
      "false",
    )
  ];

  get VideoList() {
    return [...this._videoList]
  }

  getVideo(id: string) {
    return { ...this._videoList.find(a => a.id === id) }
  }
}
