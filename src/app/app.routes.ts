import { Routes } from '@angular/router';
import { AboutInstituteComponent } from './components/about-institute/about-institute.component';
import { ScientificDepartmentsComponent } from './components/scientific-departments/scientific-departments.component'; 
import { PostgraduateProgramsComponent } from './components/postgraduate-programs/postgraduate-programs.component';

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
    loadComponent: () =>
      import(
        '../app/components/about-institute/about-institute.component'
      ).then((c) => c.AboutInstituteComponent),
  },

  {
    path: 'scientific-departments',
    loadComponent: () =>
      import(
        '../app/components/scientific-departments/scientific-departments.component'
      ).then((c) => c.ScientificDepartmentsComponent),
  },

  {
    path: 'postgraduate-programs',
    loadComponent: () =>
      import(
        '../app/components/postgraduate-programs/postgraduate-programs.component'
      ).then((c) => c.PostgraduateProgramsComponent),
  },
  {
    path: 'training',
    loadComponent: () =>
      import(
        '../app/components/training/training.component'
      ).then((c) => c.TrainingComponent),
  },
  {
    path: 'consulting-projects',
    loadComponent: () =>
      import(
        '../app/components/consulting-projects/consulting-projects.component'
      ).then((c) => c.ConsultingProjectsComponent),
  },
  {
    path: 'library',
    loadComponent: () =>
      import(
        '../app/components/library/library.component'
      ).then((c) => c.LibraryComponent),
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import(
        '../app/components/contact-us/contact-us.component'
      ).then((c) => c.ContactUsComponent),
  },

  {
    path: 'all-news',
    loadComponent: () =>
      import(
        '../app/components/contact-us/all-news/all-news.component'
      ).then((c) => c.AllNewsComponent),
  },
  {
    path: 'faculty-categories',
    loadComponent: () =>
      import('../app/components/faculty-categories/faculty-categories.component')
        .then((c) => c.FacultyCategoriesComponent),
  },

  {
    path: 'faculty',
    loadComponent: () =>
      import(
        '../app/components/faculty/faculty.component'
      ).then((c) => c.FacultyComponent),
  },
  
  {
    path: 'faculty/:id',
    loadComponent: () =>
      import('../app/components/faculty-details/faculty-details.component')
        .then((c) => c.FacultyDetailsComponent),
  },

  
];
