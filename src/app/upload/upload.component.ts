
import { Component, OnInit } from '@angular/core';

import { UploadService } from 'src/service/upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  fileToUpload: File = null;
  title: string = null;


  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFile() {
    if (this.fileToUpload == null || this.title == null) {
      alert('You must choose a file and define a title first!');
    } else {
      this.uploadService.postFile(this.title, this.fileToUpload)
        .subscribe(data => this.success(),
          error => { alert('Error in uploading!'); console.log(error); }
        );
      //  window.location.reload(true);
    }
  }

  success(): void {
    alert('file ' + this.title + 'uploaded!');
    this.title = null;
    this.fileToUpload = null;
    //   this.handleFileInput(null);
    //   (<HTMLInputElement>document.getElementById("file")).value = null;
  }

}
