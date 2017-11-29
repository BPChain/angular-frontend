import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {DashboardComponent} from './dashboard/dashboard.component';
import { BarchartComponent } from './dashboard/barchart/barchart.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BarchartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
