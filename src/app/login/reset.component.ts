import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./login.component.scss']
})
export class ResetPasswordComponent {
  public hide = true;
  public password = new FormControl('', [Validators.required]);
  public passwordc = new FormControl('', [Validators.required]);
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  resetPassword() {
    this.authenticationService
      .resetPassword(this.password.value, this.passwordc.value)
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }

  public logout() {
    return this.authenticationService.logout();
  }
}
