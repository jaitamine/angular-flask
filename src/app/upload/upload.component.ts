
import { Component, OnInit, Input, Output } from '@angular/core';

import { UploadService } from 'src/service/upload.service';
import { Resp } from 'src/entities/resp';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/service/authentication.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  fileToUpload: File = null;
  title: string = null;
  response: any;


  constructor(private uploadService: AuthenticationService) { }

  ngOnInit() {
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFile() {
    if (this.fileToUpload == null) {
      alert('You must choose a file first!');
    } else {
      this.uploadService.postFile(this.fileToUpload)
        .subscribe(data => { console.log(data), this.response=data['predictions']},
          error => {
            alert('Error in uploading!'); console.log(error);

            //  window.location.reload(true);
          }

        );
    }
  }

  success(): void {
    alert('file ' + ' ' + this.title + 'uploaded!');
    this.title = null;
    this.fileToUpload = null;
    //   this.handleFileInput(null);
    //   (<HTMLInputElement>document.getElementById("file")).value = null;
  }

}

