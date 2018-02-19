import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (
      this.route.snapshot.queryParams.expired ||
      this.auth.isAuthenticated()
    ) {
      this.auth.logout();
    }
  }

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter an email address'
      : this.email.hasError('email') ? 'Not a valid email' : '';
  }

  loginUser() {
    this.auth
      .loginUser(this.email.value, this.password.value)
      .subscribe(user => {
        if (this.auth.shouldResetPassword()) {
          this.router.navigate(['/reset-password']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
