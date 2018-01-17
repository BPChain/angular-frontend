import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FooterComponent } from './menu/footer/footer.component';
import { HeaderComponent } from './menu/header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing-module';
import { ImpressumComponent } from './impressum/impressum.component';
import {AppMaterialModule} from './app-material.module';
import {DashboardModule} from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,


    NotFoundComponent,
    ImpressumComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,

    AppRoutingModule,
    DashboardModule,

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
