import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ImpressumComponent} from './impressum/impressum.component';

export const appRoutes = [
  { path: 'impressum', component: ImpressumComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
