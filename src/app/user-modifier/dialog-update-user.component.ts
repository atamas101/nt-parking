import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { pswdEquality } from '../shared/pswd-fields.validator';
@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-update-user.html'
})
export class UpdateUserComponent {
  userModifyForm: FormGroup;
  hireDate: FormControl;
  email: FormControl;
  name: FormControl;
  password: FormControl;
  confirmPasswd: FormControl;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any = { hireDate: '', email: '', name: '' },
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
  getUsersFromServer() {
    let usersArr = this._usersService.getUsers().subscribe();
    console.log('GET users server reponse : ', usersArr);
  }
  postToServer() {
    let newUser = this.userModifyForm.value;
    this.dialogRef.close(this._usersService.editUser(newUser));
  }

  onCancel() {
    this.dialogRef.close();
  }
}
