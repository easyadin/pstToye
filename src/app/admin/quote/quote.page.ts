import { Devotional } from './../../model/media';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { QuotesService } from 'src/app/services/quotes.service';
import { MediaService } from 'src/app/services/media.service';
@Component({
  selector: 'app-quote',
  templateUrl: './quote.page.html',
  styleUrls: ['./quote.page.scss'],
})
export class QuotePage implements OnInit, OnDestroy {
  constructor(private menu: MenuController,
    private quoteService: QuotesService,
    private mediaService: MediaService,
  ) { }

  quoteList: Devotional[] = [];
  quoteSub: Subscription

  // counter
  pending = 0;
  published = 0;
  counterSub: Subscription;

  ionViewWillEnter() {
    this.menu.enable(true)
  }

  ngOnInit() {
    this.menu.enable(true)

    this.quoteSub = this.quoteService.quoteSubject.subscribe(
      quotes => {
        this.quoteList = quotes
      }
    )
    this.quoteService.fetchQuote();

    // get counters
    this.counterSub = this.mediaService.CounterSubject.subscribe(counter => {
      this.pending = counter.pending.length
      this.published = counter.published.length
    })
    this.mediaService.getCounter('Quote');
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
    this.quoteSub.unsubscribe();
  }
}
