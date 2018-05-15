import { Component, Input } from '@angular/core';
import {ScenarioUploadService} from '../services/scenario-upload.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.scss'],
})
export class FileReaderComponent {
  @Input() data: string;

  dragging = false;
  loaded = false;
  uploading = false;
  displayedFileName: string;
  file: File;
  scenarioName: string;
  scenarioDescription: string;

  constructor (private _scenarioUpload: ScenarioUploadService, public snackBar: MatSnackBar,) {
    this.scenarioName = '';
    this.scenarioDescription = '';

  }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(event) {
    event.preventDefault();
    this.dragging = false;
    this.handleInputChange(event);
  }


  handleInputChange(event) {
    this.file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    if (this.file) {
      this.loaded = true;
      this.displayedFileName = this.file.name;
    }
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.loaded = true;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  uploadFile() {
    this.uploading = true;
    this._scenarioUpload.upload({
      file: this.file,
      scenarioName: this.scenarioName,
      scenarioDescription: this.scenarioDescription,
    })
    .subscribe(result => {
      this.uploading = false;
      this.openSnackBar(`Successfully uploaded: '${this.scenarioName}'`);
      this.scenarioName = '';
      this.file = undefined;
      this.displayedFileName = '';
      this.loaded = false;
    }, error => {
      this.uploading = false;
      this.openSnackBar(`Uploading file: '${this.scenarioName}' failed`);
      console.error(error);
    });
  }
}
