import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { MyVideos } from './pages/my-videos/my-videos';
import { Home } from './pages/home/home';
import { AuthGuard } from './services/auth-guard';

export const routes: Routes = [
  {
    path: 'register',
    component: Signup,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'home',
    component: Home,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-videos',
    component: MyVideos,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
