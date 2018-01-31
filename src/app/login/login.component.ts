import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public hide = true;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter an email address'
      : this.email.hasError('email') ? 'Not a valid email' : '';
  }

  loginUser() {
    this.authenticationService
      .loginUser(this.email.value, this.password.value)
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }
}
