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
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing-module';

import {
  MatButtonModule, MatIconModule, MatToolbarModule, MatCardModule, MatCheckboxModule,
  MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule,
  MatSnackBarModule, MatSelectModule,
} from '@angular/material';

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
    LandingComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  providers: [HttpClientModule, DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
