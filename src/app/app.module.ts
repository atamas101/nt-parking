import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NtmaterialModule } from './ntmaterial/ntmaterial.module';
import { UserModifierComponent } from './user-modifier/user-modifier.component';
import { UserModifierContentComponent } from './user-modifier/user-modifier-content.component';

@NgModule({
  declarations: [
    AppComponent,
    UserModifierComponent,
    UserModifierContentComponent
  ],

  imports: [BrowserModule, BrowserAnimationsModule, NtmaterialModule],
  entryComponents: [UserModifierComponent, UserModifierContentComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
