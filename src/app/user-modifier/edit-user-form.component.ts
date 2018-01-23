import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges
} from '@angular/core';
import { DialogWrapper } from './dialog-wrapper.component';
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

  userModifyForm: FormGroup;
  lastName: FormControl;
  firstName: FormControl;
  hireDate: FormControl;

  constructor(private usersService: UsersService) {}

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

  ngOnChanges(changes) {
    console.log(changes);
    if (changes.parentOkBtn.currentValue) {
      let newUser = this.userModifyForm.value;
      // this.closeDialogConfirmation.emit(this.usersService.editUser(newUser));
      this.closeDialogConfirmation.emit('áaaa');
    }
  }
}
