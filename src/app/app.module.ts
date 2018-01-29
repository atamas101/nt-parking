import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NtmaterialModule } from './ntmaterial/ntmaterial.module';
import { LoginComponent } from './login/login.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { UsersModule } from './users/users.module';
import { WeekModule } from './week/week.module';
import { AuthenticationService } from './login/auth.service';
import { AuthGuard } from './login/auth-guard.service';
@NgModule({
  declarations: [AppComponent, LoginComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NtmaterialModule,
    UsersModule,
    WeekModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, AuthGuard],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
