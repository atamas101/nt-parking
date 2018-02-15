import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { pswdEquality } from '../shared/validators/pswd-fields.validator';
import { OnInit } from '@angular/core';
@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-update-user.html',
  styleUrls: ['./dialog-update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  userModifyForm: FormGroup;
  hireDate: FormControl;
  email: FormControl;
  name: FormControl;
  password: FormControl;
  confirmPasswd: FormControl;
  errors: any;
  public titleText: string;

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
    this.hireDate = new FormControl(this.data.hireDate, Validators.required);

    this.email = new FormControl(this.data.email, [
      Validators.required,
      Validators.email
    ]);
    this.name = new FormControl(this.data.name, Validators.required);

    const requiredValidator = this.isEditMode ? null : Validators.required;

    const passwordValidators = [];

    if (!this.isEditMode()) {
      passwordValidators.push(Validators.required);
      this.titleText = 'ADD';
    } else {
      this.titleText = 'EDIT';
    }
    this.password = new FormControl('', passwordValidators);

    const passwdField = this.password;

    passwordValidators.push(pswdEquality(passwdField));

    this['password-confirm'] = new FormControl('', passwordValidators);

    this.userModifyForm = new FormGroup({
      hireDate: this.hireDate,
      email: this.email,
      name: this.name,
      password: this.password,
      'password-confirm': this['password-confirm']
    });
  }
  postToServer() {
    const newUser = Object.assign(this.data, this.userModifyForm.value);
    this._usersService
      .addEditUser(newUser)
      .subscribe(response => this.dialogRef.close(response));
  }
  isEditMode() {
    return this.data._id;
  }
  onCancel() {
    this.dialogRef.close();
  }
}
