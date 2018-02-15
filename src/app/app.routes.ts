import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { WeekViewComponent } from './week/week-view.component';

import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './login/reset.component';
import { UsersComponent } from './users/users-list.component';
import { AuthGuard } from './login/auth-guard.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: WeekViewComponent,
    canActivate: [AuthGuard]
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];
