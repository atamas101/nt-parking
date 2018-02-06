import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { AuthenticationService } from './login/auth.service';
import { log } from 'util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public sideNavMode: String = 'side';
  private watcher: Subscription;

  constructor(media: ObservableMedia, private auth: AuthenticationService) {
    this.watcher = media.subscribe((change: MediaChange) => {
      const sideNaveMode = ['xs', 'sm'].includes(change.mqAlias)
        ? 'push'
        : 'side';
      this.switchSideNavMode(sideNaveMode);
    });
  }
  public logout() {
    return this.auth.logout();
  }

  public isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  public switchSideNavMode(mode) {
    this.sideNavMode = mode;
  }
}
