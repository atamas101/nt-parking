import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class NtHttpInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
    const request = req.clone({
      url: `http://localhost:7778/api/${req.url}`,
      headers: req.headers.set('Content-Type', 'application/json'),
      withCredentials: true
    });

    // send the newly created request
    return next.handle(request).catch((err, caught) => {
      // intercept the respons error and displace it to the console
      this.openSnackBar(err.error);
      if (err.errror && err.errror.stackHighlighted) {
        console.error(err.error.stackHighlighted);
      }
      if (err.error === 'Must be authenticated.') {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      }
      // return the error to the method that called it
      return Observable.throw(err);
    }) as any;
  }

  openSnackBar(message: string, action: string = 'Dismiss') {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }
}
