import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NtmaterialModuleModule } from './ntmaterial-module/ntmaterial-module.module';

@NgModule({
  declarations: [AppComponent],

  imports: [BrowserModule, BrowserAnimationsModule, NtmaterialModuleModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
