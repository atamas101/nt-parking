import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'dialog-content',
    template: ''
})
export class UserModifierContentComponent {
    constructor(
        public dialogRef: MatDialogRef<UserModifierContentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any //this data exists only if its an edit field
    ) { }                                             //aka => INJECTED here, made available                                          

    onNoClick(): void {
        this.dialogRef.close();
    }
}


