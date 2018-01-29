import { FormControl } from '@angular/forms';

export function pswdEquality(pswd) {
  return (control: FormControl): { [key: string]: any } => {
    if (!pswd) return null;
    return control.value !== pswd.value
      ? { passwordMatch: 'Passwrds dont match' }
      : null;
  };
}
