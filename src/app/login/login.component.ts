import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public hide = true;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  constructor(private authenticationService: AuthenticationService) {}
  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter an email address'
      : this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // ngOnInit(){
  //   // reset login status
  //   this.authenticationService.logout();
  // }
  loading = false;

  loginUser() {
    console.log(this.email);
    console.log(this.password);
    this.loading = true;
    this.authenticationService
      .loginUser(this.email.value, this.password.value)
      .subscribe(
        data => {
          console.log('muuuu');
        },
        error => {
          this.loading = false;
        }
      );
  }
}
