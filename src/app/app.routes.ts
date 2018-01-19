import { Routes } from '@angular/router';
import { WeekViewComponent } from './week-view-wrapper/week-view.component';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'week', component: WeekViewComponent },
  { path: '', pathMatch: 'full', redirectTo: 'week' }
];
