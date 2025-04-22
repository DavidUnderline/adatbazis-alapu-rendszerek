import { Routes } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';

let title = "ProfSession"

export const routes: Routes = [
  { path: 'hero', component: HeroComponent, title: title + ' | Welcome' },
  { path: 'search', loadComponent: () => import("./pages/search/search.component").then(c => c.SearchComponent), title: title + ' | Keresés' },
  { path:'work-details', loadComponent: () => import("./pages/work-details/work-details.component").then(c => c.WorkDetailsComponent), title: title + "Információ"},
  { path:'register', loadComponent: () => import("./pages/register/register.component").then( c => c.RegisterComponent)},
  { path: 'login', loadComponent: ()=> import("./pages/login/login.component").then(c => c.LoginComponent), title: title + " | Login"},

  { path: '**', component: HeroComponent, title: title + ' | Welcome'}
];
