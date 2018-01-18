import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatSelectModule,
  MatDialogModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: []
})
export class NtmaterialModule {}
