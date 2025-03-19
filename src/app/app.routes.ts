import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: HomeComponent },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];
