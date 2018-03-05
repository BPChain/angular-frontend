import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FrappeDirective } from './frappe.directive';
import {HttpClientModule, HttpClient} from '@angular/common/http';


import { SelectionBarComponent } from './selection-bar/selection-bar.component';
import { DescriptionBarComponent } from './description-bar/description-bar.component';
import { DataVisualizationBarComponent } from './data-visualization-bar/data-visualization-bar.component';


import { DataRetrieverService } from './data-retriever.service';

@NgModule({
  declarations: [
    AppComponent,
    FrappeDirective,
    SelectionBarComponent,
    DescriptionBarComponent,
    DataVisualizationBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [DataRetrieverService],
  bootstrap: [AppComponent]
})

export class AppModule { }
