import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarchartComponent } from './dashboard/barchart/barchart.component';
import { ChartsModule } from 'ng2-charts';
import { MetricComponent } from './dashboard/metric/metric.component';
import { FormComponent } from './dashboard/form/form.component';
import { PublicChartsComponent } from './dashboard/barcharts/public-charts/public-charts.component';
import { PrivateChartsComponent } from './dashboard/barcharts/private-charts/private-charts.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BarchartComponent,
    MetricComponent,
    FormComponent,
    PublicChartsComponent,
    PrivateChartsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
