import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { AuthenticationService } from './login/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  public mode = 'side';

  watcher: Subscription;

  constructor(media: ObservableMedia, private auth: AuthenticationService) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.switchSideNavMode('push');
      } else {
        this.switchSideNavMode('side');
      }
    });
  }

  public isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  public switchSideNavMode(mode) {
    this.mode = mode;
  }
}
