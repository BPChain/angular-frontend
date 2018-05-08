import { Component, Input } from '@angular/core';
import {ScenarioUploadService} from '../services/scenario-upload.service';

@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.scss'],
})
export class FileReaderComponent {
  @Input() data: string;

  dragging = false;
  loaded = false;
  fileSrc = '';
  displayedFileName: string;
  file: File;
  scenarioName: '';

  constructor (private _scenarioUpload: ScenarioUploadService) {

  }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }


  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const reader = new FileReader();

    if (file) {
      this.loaded = false;
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsText(file);
      this.displayedFileName = file.name;
    }
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.fileSrc = reader.result;
    this.loaded = true;
  }

  uploadFile() {
    this._scenarioUpload.upload({
      name: this.scenarioName,
      script: this.fileSrc,
    })
    .subscribe(result => console.info(result));
  }
}
