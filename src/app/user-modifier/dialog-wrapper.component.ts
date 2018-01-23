import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-wrapper.html'
})
export class DialogWrapper {
  userModifyForm: FormGroup;
  lastName: FormControl;
  firstName: FormControl;
  hireDate: FormControl;

  constructor(
    public dialogRef: MatDialogRef<DialogWrapper>,
    @Inject(MAT_DIALOG_DATA)
    public data: any = { lastName: '', firstName: '', hireDate: '' },
    private _usersService: UsersService
  ) {}

  ngOnInit() {
    this.lastName = new FormControl(this.data.lastName, Validators.required);
    this.firstName = new FormControl(this.data.firstName, Validators.required);
    this.hireDate = new FormControl(this.data.hireDate, Validators.required);

    this.userModifyForm = new FormGroup({
      lastName: this.lastName,
      firstName: this.firstName,
      hireDate: this.hireDate
    });
  }

  postToServer() {
    let newUser = this.userModifyForm.value;
    this.dialogRef.close(this._usersService.editUser(newUser));
  }

  onCancel() {
    this.dialogRef.close();
  }
}
