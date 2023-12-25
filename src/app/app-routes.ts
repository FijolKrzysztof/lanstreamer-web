import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'authentication/:id',
    loadComponent: () => import('./modules/authentication/authentication.component').then(c => c.AuthenticationComponent)
  },
  {
    path: 'user',
    loadComponent: () => import('./modules/user/user.component').then(c => c.UserComponent)
  }
];
