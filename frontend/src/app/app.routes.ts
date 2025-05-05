import { Routes } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';

let title = "ProfSession"

export const routes: Routes = [
  { path: 'hero', component: HeroComponent, title: title + ' | Welcome' },
  { path: 'search', loadComponent: () => import("./pages/search/search.component").then(c => c.SearchComponent), title: title + ' | Keresés' },
  { path:'work-details', loadComponent: () => import("./pages/work-details/work-details.component").then(c => c.WorkDetailsComponent), title: title + "| Információ"},
  { path:'register', loadComponent: () => import("./pages/register/register.component").then( c => c.RegisterComponent)},
  { path: 'login', loadComponent: ()=> import("./pages/login/login.component").then(c => c.LoginComponent), title: title + " | Login"},
  { path: 'publish', loadComponent: () => import("./pages/publish/publish.component").then( c => c.PublishComponent), title: title + " | Hírdetés"},
  { path: 'profile', loadComponent: () => import("./pages/profile/profile.component").then( c => c.ProfileComponent), title: title + " | Profil"},
  { path: 'admin_login', component: AdminLoginComponent, title: title + " | ADMIN"},
  { path: 'admin_home', loadComponent: ()=> import("./pages/admin/main-page/main-page.component").then( c => c.MainPageComponent), title: title + " | ADMIN HOME"},

  { path: '**', component: HeroComponent, title: title + ' | Welcome'}
];
