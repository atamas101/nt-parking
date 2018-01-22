import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges
} from '@angular/core';
import { DialogWrapper } from './dialog-wrapper.component';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'user-modifier-form',
  templateUrl: './edit-user-form.html'
})
export class UserModifierForm {
  @Input() userToEdit;
  @Input() parentOkBtn;
  @Output() formValidator: EventEmitter<any> = new EventEmitter();
  @Output() closeDialogConfirmation: EventEmitter<any> = new EventEmitter();
  private _newUser;
  constructor(
    public dialogRef: MatDialogRef<UserModifierForm>,
    private usersService: UsersService
  ) {}

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
  ngOnChanges() {
    if (this.parentOkBtn) {
      console.log('Dialog clicked OK');
      this._newUser = this.userModifyForm.value;

      this.closeDialogConfirmation.emit(
        this.usersService.editUser(this._newUser)
      );

      // this.dialogRef.close();
    }
  }

  // onConfirmation() {
  //   this.dialogRef.close(this._newUser);
  // }

  // onCancel() {
  //   this.dialogRef.close();
  // }
  // onSubmit(form) {
  //   this._newUser = form.value;
  //   this.onConfirmation();
  //   console.log(this.userModifyForm);
  // console.log(form, 'sent from html');
  // }
}
