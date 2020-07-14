import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Media } from '../model/media';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private afstorage: AngularFireStorage,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,

  ) {
    // signup user

  }



  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  downloadPercentageSubject = new Subject<any>();
  downloadPercentage;

  // upload media: 
  uploadMedia(form, mediaType, mediaDetails) {
    // get the form details >> album,author,media,name
    var createAt = Date.now();
    const file = mediaDetails;
    const filePath = `${mediaType}/${createAt}`; // seperate path for audio & video
    const fileRef = this.afstorage.ref(filePath);
    const task = this.afstorage.upload(filePath, file); // upload

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL()
        this.downloadURL.subscribe(url => {
          // if (url) {
          //   console.log(url)
          // }
        })
      })
    ).subscribe((task) => {
      this.downloadPercentage = ((task.bytesTransferred / task.totalBytes) * 100);
      this.downloadPercentageSubject.next(this.downloadPercentage)
      console.log(task)
    })

    // upload to storage

    // get download url

    // build media
    // const media = new Media()
    // add media data to database
  }
}
