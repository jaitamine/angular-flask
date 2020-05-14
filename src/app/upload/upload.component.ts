
import { Component, OnInit, Input, Output, Pipe, PipeTransform } from '@angular/core';

import { UploadService } from 'src/service/upload.service';
import { Resp } from 'src/entities/resp';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';
import { ResultsService } from 'src/service/results.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  fileToUpload: File = null;
  title: string = null;
  response : any [];
  msg : string;


  constructor(private uploadService: AuthenticationService,
     private resultsService: ResultsService,
     private router: Router) { }

  ngOnInit() {
    this.uploadFile_formdata()
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFile() {
    if (this.fileToUpload == null) {
      alert('You must choose a file first!');
    } else {
      this.uploadService.postFile_cloud(this.fileToUpload)
        .subscribe(data => { console.log(data), this.response=data['predictions'], console.log(this.response);
        if (this.response[0] === 0){
          this.msg = "the employee will not leave";
        }
      else {this.msg = "the employee will leave"}},
          error => {
            alert('Error in uploading!'); console.log(error);

            //  window.location.reload(true);
          }
          
        );
    }
    

  }

  uploadFile_formdata() {
    if (this.fileToUpload == null) {
      alert('You must choose a file first!');
    } else {
      this.uploadService.postFile_formdata(this.fileToUpload)
        .subscribe(data => { console.log(data); this.response=data['predictions'];
         console.log(this.response);
         this.resultsService.setJSONData(this.response);
         this.router.navigate(['/result'])},
          error => {
            alert('Error in uploading!'); console.log(error);

            //  window.location.reload(true);
          }
          )
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

// @Pipe({name: 'mapToArray'})
// export class MapToArray implements PipeTransform {
//   transform(value, args:string[]) : any {
//     let arr = [];
//     for (let key in value) {
//       arr.push({key: key, value: value[key]});
//     }
//     return arr;
//   }
// }
