import { Routes } from '@angular/router'
import { AuthGuard } from '@swogeti/control-flow'

export const routes: Routes = [
    { path: 'home', 
        loadComponent: () => import('@swogeti/home-component')
        .then(v => v.HomeComponent)},
    { path: 'dashboard', canActivate: [AuthGuard], 
        loadComponent: () => import('@swogeti/dashboard')
            .then(v => v.DashboardComponent) },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
]