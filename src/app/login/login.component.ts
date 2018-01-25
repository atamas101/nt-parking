import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public hide = true;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter an email address'
      : this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
