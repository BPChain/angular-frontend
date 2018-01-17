import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChartsModule} from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './menu/footer/footer.component';
import { HeaderComponent } from './menu/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { FormComponent } from './dashboard/form/form.component';
import { MetricComponent } from './dashboard/metric/metric.component';
import { PublicChartsComponent } from './dashboard/charts/public-charts/public-charts.component';
import { PrivateChartsComponent } from './dashboard/charts/private-charts/private-charts.component';
import { BarchartComponent } from './dashboard/charts/barchart/barchart.component';
import { LinechartComponent } from './dashboard/charts/linechart/linechart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing-module';
import { ImpressumComponent } from './impressum/impressum.component';
import {AppMaterialModule} from './app-material.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    WelcomeComponent,
    FormComponent,
    MetricComponent,
    PublicChartsComponent,
    PrivateChartsComponent,
    BarchartComponent,
    LinechartComponent,
    NotFoundComponent,
    ImpressumComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,

  ],
  providers: [HttpClientModule, DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
