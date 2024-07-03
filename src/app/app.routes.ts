import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'tasks/:username',
    component: TasksComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];
