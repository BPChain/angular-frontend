import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CONFIG} from '../config';

import { SelectionBarComponent } from './selection-bar/selection-bar.component';
import { ChainDataSourceSelectorComponent } from './chain-data-source-selector/chain-data-source-selector.component';
import { ParameterSetterComponent } from './parameter-setter/parameter-setter.component';

import { ScenarioBarComponent } from './scenario-bar/scenario-bar.component';
import { DataVisualizationBarComponent } from './data-visualization-bar/data-visualization-bar.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { PlotlyLinechartComponent} from './charts/plotly-linechart/plotly-linechart.component';
import { BarchartComponent } from './charts/barchart/barchart.component';
import { ChainRecorderComponent} from './chain-recorder/chain-recorder.component';
import { ChainRecorderDisplayComponent} from './chain-recorder-display/chain-recorder-display.component';
import { FileReaderComponent } from './file-reader/file-reader.component';

import { DataRetrieverService } from './services/data-retriever.service';
import { ChainSelectorService } from './services/chain-selector.service';
import { UserAuthenticationService } from './services/user-authentication.service';
import { ParameterConfiguratorService } from './services/parameter-configurator.service';
import {ScenarioUploadService } from './services/scenario-upload.service';
import { RecordingService } from './services/recording.service';
import {ReplayService} from './services/replay.service';


@NgModule({
  declarations: [
    AppComponent,
    SelectionBarComponent,
    ScenarioBarComponent,
    DataVisualizationBarComponent,
    LoginDialogComponent,
    BarchartComponent,
    ChainDataSourceSelectorComponent,
    ParameterSetterComponent,
    ChainRecorderComponent,
    ChainRecorderDisplayComponent,
    FileReaderComponent,
    PlotlyLinechartComponent
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
    ScenarioUploadService,
    RecordingService,
    ReplayService
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent],
})

export class AppModule { }
