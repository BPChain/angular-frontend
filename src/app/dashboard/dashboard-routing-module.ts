import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {FormComponent} from './form/form.component';
import {ChartsComponent} from './charts/charts.component';

export const appRoutes = [
  { path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', component: FormComponent},
      {path: 'charts', component: ChartsComponent}
  ]},
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
export class DashboardRoutingModule { }
