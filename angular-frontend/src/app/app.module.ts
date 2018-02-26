import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';


import { SelectionBarComponent } from './selection-bar/selection-bar.component';
import { DescriptionBarComponent } from './description-bar/description-bar.component';
import { DataVisualizationBarComponent } from './data-visualization-bar/data-visualization-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    SelectionBarComponent,
    DescriptionBarComponent,
    DataVisualizationBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
