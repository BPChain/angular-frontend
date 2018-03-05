import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';


import { SelectionBarComponent } from './selection-bar/selection-bar.component';
import { DescriptionBarComponent } from './description-bar/description-bar.component';
import { DataVisualizationBarComponent } from './data-visualization-bar/data-visualization-bar.component';

import { DataRetrieverService } from './services/data-retriever.service';
import { LinechartComponent } from './charts/linechart/linechart.component';
import { BarchartComponent } from './charts/barchart/barchart.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectionBarComponent,
    DescriptionBarComponent,
    DataVisualizationBarComponent,
    LinechartComponent,
    BarchartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [DataRetrieverService],
  bootstrap: [AppComponent]
})

export class AppModule { }
