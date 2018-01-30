import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NtmaterialModule } from './ntmaterial/ntmaterial.module';
import { LoginComponent } from './login/login.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { UsersModule } from './users/users.module';
import { WeekModule } from './week/week.module';
import { AuthenticationService } from './login/auth.service';
import { AuthGuard } from './login/auth-guard.service';
import { NtHttpInterceptor } from './shared/http.interceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NtmaterialModule,
    UsersModule,
    WeekModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NtHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
