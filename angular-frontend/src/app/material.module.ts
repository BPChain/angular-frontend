import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTabsModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatListModule,
  MatIconModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTabsModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatListModule,
  MatIconModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,
];


@NgModule({
  imports: modules,
  exports: modules,
})

export class MaterialModule { }
