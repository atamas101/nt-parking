import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogWrapper } from './dialog-wrapper.component';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'user-modifier-form',
  templateUrl: './edit-user-form.html'
})
export class UserModifierForm {
  @Input() userToEdit;
  @Output() formValidator: EventEmitter<any> = new EventEmitter();
  private _newUser;
  constructor(public dialogRef: MatDialogRef<UserModifierForm>) {}

  userModifyForm: FormGroup;
  lastName: FormControl;
  firstName: FormControl;
  hireDate: FormControl;

  ngOnInit() {
    this.lastName = new FormControl(
      this.userToEdit.lastName,
      Validators.required
    );
    this.firstName = new FormControl(
      this.userToEdit.firstName,
      Validators.required
    );
    this.hireDate = new FormControl(
      this.userToEdit.hireDate,
      Validators.required
    );

    this.userModifyForm = new FormGroup({
      lastName: this.lastName,
      firstName: this.firstName,
      hireDate: this.hireDate
    });

    /* emit status of the form to disabled the OK btn from dialog-wrapper */
    this.userModifyForm.valueChanges.debounceTime(200).subscribe(formValues => {
      this.formValidator.emit(this.userModifyForm.invalid);
    });
  }

  onConfirmation() {
    this.dialogRef.close(this._newUser);
  }
  onCancel() {
    this.dialogRef.close();
  }
  onSubmit(form) {
    this._newUser = form.value;
    this.onConfirmation();
    console.log(this.userModifyForm);
    // console.log(form, 'sent from html');
  }
}
