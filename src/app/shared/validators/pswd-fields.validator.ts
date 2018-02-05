import { FormControl } from '@angular/forms';

export function pswdEquality(passwordField) {
  return (targetField: FormControl): { [key: string]: any } => {
    console.log(passwordField, targetField);
    if (!passwordField) return null;
    return targetField.value !== passwordField.value
      ? { passwordMatch: 'Passwords dont match' }
      : null;
  };
}
