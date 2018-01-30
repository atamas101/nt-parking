import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { pswdEquality } from '../shared/validators/pswd-fields.validator';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-update-user.html',
  styleUrls: ['./dialog-update-user.component.scss']
})
export class UpdateUserComponent implements OnChanges {
  userModifyForm: FormGroup;
  hireDate: FormControl;
  email: FormControl;
  name: FormControl;
  password: FormControl;
  confirmPasswd: FormControl;
  errors: any;
  disableBtn: boolean;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any = {
      admin: '',
      _id: '',
      hireDate: '',
      email: '',
      name: '',
      'password-confirm': ''
    },
    private _usersService: UsersService
  ) {}

  ngOnInit() {
    // this.errors = this._usersService.handleError():
    this.hireDate = new FormControl(this.data.hireDate, Validators.required);

    this.email = new FormControl(this.data.email, [
      Validators.required,
      Validators.email
    ]);
    this.name = new FormControl(this.data.name, Validators.required);
    this.password = new FormControl(this.data.password || '');

    let passwdField = this.password;

    this['password-confirm'] = new FormControl('', [pswdEquality(passwdField)]);
    this.disableBtn = true;

    this.userModifyForm = new FormGroup({
      hireDate: this.hireDate,
      email: this.email,
      name: this.name,
      password: this.password,
      'password-confirm': this['password-confirm']
    });
    // console.log(this.userModifyForm.controls.email.valid);
    // if (this.data._id) {
    //   this.disableBtn = !(
    //     this.userModifyForm.controls.hireDate.valid &&
    //     this.userModifyForm.controls.email.valid &&
    //     this.userModifyForm.controls.name.valid
    //   );
    //   console.log('disableBtn', this.disableBtn);
    // } else {
    //   this.disableBtn = this.userModifyForm.invalid;
    //   console.log('disableBtn', this.disableBtn);
    // }

    console.log(this.userModifyForm);
  }
  postToServer() {
    let newUser = Object.assign(this.data, this.userModifyForm.value);
    console.log(this.userModifyForm);
    this._usersService.addEditUser(newUser).subscribe(response =>
      // console.log('response', response);
      this.dialogRef.close(response)
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
