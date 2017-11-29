import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarchartComponent } from './dashboard/barchart/barchart.component';
import { ChartsModule } from 'ng2-charts';
import { MetricComponent } from './dashboard/metric/metric.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BarchartComponent,
    MetricComponent,
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
