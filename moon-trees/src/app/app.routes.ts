﻿import { Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { TreeMapComponent } from './components/map/map.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'map', component: TreeMapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];

