import { Routes } from '@angular/router';
import { AboutInstituteComponent } from './components/about-institute/about-institute.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/components/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'about-us',
    component: AboutInstituteComponent,
  },
];
