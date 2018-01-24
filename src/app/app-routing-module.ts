import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ImpressumComponent} from './impressum/impressum.component';

export const appRoutes = [
  // { path: 'impressum', component: ImpressumComponent },
  { path: '', component: DashboardComponent },
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
