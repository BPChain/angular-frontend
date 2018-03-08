import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { SelectionBarComponent } from './selection-bar/selection-bar.component';
import { DescriptionBarComponent } from './description-bar/description-bar.component';
import { DataVisualizationBarComponent } from './data-visualization-bar/data-visualization-bar.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { LinechartComponent } from './charts/linechart/linechart.component';
import { BarchartComponent } from './charts/barchart/barchart.component';

import { DataRetrieverService } from './services/data-retriever.service';
import { ChainSelectorService } from './services/chain-selector.service';
import { UserAuthenticationService } from './services/user-authentication.service';



@NgModule({
  declarations: [
    AppComponent,
    SelectionBarComponent,
    DescriptionBarComponent,
    DataVisualizationBarComponent,
    LoginDialogComponent,
    LinechartComponent,
    BarchartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DataRetrieverService,
    ChainSelectorService,
    UserAuthenticationService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent],
})

export class AppModule { }
