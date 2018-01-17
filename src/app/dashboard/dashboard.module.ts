import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppMaterialModule} from '../app-material.module';
import {DashboardComponent} from './dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormComponent} from './form/form.component';
import {MetricComponent} from './metric/metric.component';
import {PublicChartsComponent} from './charts/public-charts/public-charts.component';
import {PrivateChartsComponent} from './charts/private-charts/private-charts.component';
import {BarchartComponent} from './charts/barchart/barchart.component';
import {LinechartComponent} from './charts/linechart/linechart.component';
import {ChartsModule} from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,

  ],
  declarations: [
    DashboardComponent,
    WelcomeComponent,
    FormComponent,
    MetricComponent,
    PublicChartsComponent,
    PrivateChartsComponent,
    BarchartComponent,
    LinechartComponent,
  ],
  providers: [HttpClientModule, DatePipe],

})
export class DashboardModule { }
