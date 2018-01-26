import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { pswdEquality } from '../shared/pswd-fields.validator';
import { IUsers } from '../users/users.model';
@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-update-user.html',
  styles: ['mat-form-field {display: block}']
})
export class UpdateUserComponent {
  userModifyForm: FormGroup;
  hireDate: FormControl;
  email: FormControl;
  name: FormControl;
  password: FormControl;
  confirmPasswd: FormControl;
  public usersArr;
  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any = {
      admin: '',
      _id: '',
      hireDate: '',
      email: '',
      name: ''
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
    this.password = new FormControl(this.data.password, Validators.required);

    let passwdField = this.password;

    this.confirmPasswd = new FormControl(this.data.confirmPasswd, [
      Validators.required,
      pswdEquality(passwdField)
    ]);

    this.userModifyForm = new FormGroup({
      hireDate: this.hireDate,
      email: this.email,
      name: this.name,
      password: this.password,
      confirmPasswd: this.confirmPasswd
    });
  }

  postToServer() {
    let newUser = Object.assign(this.data, this.userModifyForm.value);
    console.log(newUser);
    this.dialogRef.close(
      this._usersService.addEditUser(newUser).subscribe(response => response)
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
