import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'authentication/:id',
    loadComponent: () => import('./modules/authentication/authentication.component').then(m => m.AuthenticationComponent)
  },
];
