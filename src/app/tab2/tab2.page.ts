import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  isToggle = 'all';

  segmentChanged(ev: any) {
    this.isToggle = ev.target.value;
  }
}
