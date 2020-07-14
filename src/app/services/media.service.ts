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
import { ToastController } from '@ionic/angular';

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
    public toastController: ToastController
  ) {
    this.audioCollection = afs.collection<Media>('audio');
    this.audioItems = this.audioCollection.valueChanges();

    this.videoCollection = afs.collection<Media>('video');
    this.videoItems = this.videoCollection.valueChanges();

    // counters 
    // this.afs.collection<Media>('Audio', ref => ref.where("published", "==", true)).valueChanges()
    // this.afs.collection<Media>('Audio', ref => ref.where("published", "==", false)).valueChanges()

    // this.afs.collection<Media>('Audio', ref => ref.where("published", "==", true)).valueChanges()
    // this.afs.collection<Media>('Audio', ref => ref.where("published", "==", false)).valueChanges()
  }

  audioCollection
  audioItems
  videoCollection
  videoItems

  media: Media;

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
          // get download url
          const id = this.afs.createId(); // generate id
          if (url) {
            // build media
            this.media = new Media(
              id,
              "",
              form.name,
              form.author,
              mediaType,
              url,
              url,
              "",
              "", //
              "", // isLiked? 
              "", // local download status
              false // published
            )
            // add media data to database audio | video 
            // this.afs.collection<any>(mediaType).add(JSON.parse(JSON.stringify(this.media))).then(
            //   resp => {
            //     this.presentToast(mediaType)
            //   }
            // )
            this.afs.collection(mediaType).doc(id).set(JSON.parse(JSON.stringify(this.media))).then(
              resp => {
                this.presentToast(mediaType)
              }
            )
          }
        })
      })
    ).subscribe((task) => {
      this.downloadPercentage = ((task.bytesTransferred / task.totalBytes) * 100);
      this.downloadPercentageSubject.next(this.downloadPercentage)
    })
  }


  Counter = {
    pending: [],
    published: [],
  }
  CounterSubject = new Subject<any>();

  // return the pending and published counts for all mediaTypes
  getCounter(mediaType) {
    this.afs.collection<Media>(mediaType, ref => ref.where("published", "==", true)).valueChanges()
      .subscribe(p => {
        this.Counter.published = p
        this.CounterSubject.next(this.Counter);
      });

    this.afs.collection<Media>(mediaType, ref => ref.where("published", "==", false)).valueChanges()
      .subscribe(p => {
        this.Counter.pending = p
        this.CounterSubject.next(this.Counter);
      });
  }


  // modify status - Publish | unpublish | delete

  // delete media
  delete(id, mediaType) {
    this.afs.collection(mediaType).doc(id).delete();
  }

  // publish media
  publish(id, mediaType) {
    this.afs.collection(mediaType).doc(id).update({
      "published": true
    })
  }

  // unpublish
  unPublish(id, mediaType) {
    this.afs.collection(mediaType).doc(id).update({
      "published": false
    })
  }

  // alert modal
  async alertModal(message) {
    // user not found 
    const alert = this.alertController.create({
      cssClass: 'modal-css',
      message: message,
      buttons: ['OK']
    });
    (await alert).present()
  }

  async presentToast(mediaType) {
    const toast = await this.toastController.create({
      message: `${mediaType} was uploaded successfully`,
      duration: 3000
    });
    toast.present();
  }
}
