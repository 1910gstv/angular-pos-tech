import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { MyVideos } from './pages/my-videos/my-videos';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: 'cadastro',
    component: Signup,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'my-videos',
    component: MyVideos,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
