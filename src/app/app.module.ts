import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SelectionBarComponent } from './selection-bar/selection-bar.component';
import { ChainDataSourceSelectorComponent } from './chain-data-source-selector/chain-data-source-selector.component';
import { ParameterSetterComponent } from './parameter-setter/parameter-setter.component';

import { ScenarioBarComponent } from './scenario-bar/scenario-bar.component';
import { DataVisualizationBarComponent } from './data-visualization-bar/data-visualization-bar.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { LinechartComponent } from './charts/linechart/linechart.component';
import { BarchartComponent } from './charts/barchart/barchart.component';
import { ChainRecorderComponent} from "./chain-recorder/chain-recorder.component";

import { DataRetrieverService } from './services/data-retriever.service';
import { ChainSelectorService } from './services/chain-selector.service';
import { UserAuthenticationService } from './services/user-authentication.service';
import { ParameterConfiguratorService } from './services/parameter-configurator.service';



@NgModule({
  declarations: [
    AppComponent,
    SelectionBarComponent,
    ScenarioBarComponent,
    DataVisualizationBarComponent,
    LoginDialogComponent,
    LinechartComponent,
    BarchartComponent,
    ChainDataSourceSelectorComponent,
    ParameterSetterComponent,
    ChainRecorderComponent
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
    ParameterConfiguratorService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent],
})

export class AppModule { }
