import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'side';

  watcher: Subscription;

  constructor(media: ObservableMedia) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.switchSideNavMode('push');
      } else {
        this.switchSideNavMode('side');
      }
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  switchSideNavMode(mode) {
    this.mode = mode;
  }
}
