import { Component, OnInit, Input } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat, merge, Observable } from 'rxjs';
import { Cloud } from 'src/service/cloud.service';
import { Router } from '@angular/router';
import { ResultsService } from 'src/service/results.service';
import { AngularFireStorageReference, AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload-multiple',
  templateUrl: './upload-multiple.component.html',
  styleUrls: ['./upload-multiple.component.css']
})
export class UploadMultipleComponent implements OnInit {
  
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  response: any[] = [];
  fileNames : any[] = [];
  imageUrl: string;
  downloadURL: Observable<string>;


  constructor(private cloud : Cloud, private router: Router, private saveResults:ResultsService, private afStorage: AngularFireStorage) {}

  ngOnInit() {
  }

  fileOverBase(event):  void {
    this.hasBaseDropZoneOver  =  event;
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  upload() {  

    const user = localStorage.getItem('user');

    let files = this.getFiles();
    console.log(files);
    let requests = [];
    files.forEach((file) => {
      let id = Math.random().toString(36).substring(2)+'.dcm';
      this.ref = this.afStorage.ref(user + '/' + id);
      console.log(this.ref);
      this.task = this.ref.put(file.rawFile);
      console.log(this.task);
      let formData = new FormData();
      formData.append('file' , file.rawFile, file.name);
      // this.fileNames.push(file.name.replace(/\.[^/.]+$/, ""))
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
          this.downloadURL.subscribe(url => { this.imageUrl = url;
            console.log(this.imageUrl);        
          });
        })
          requests.push(this.cloud.postFile_formdata(formData));  
    });

    concat(...requests).subscribe(
      (res) => {
        console.log(res);
        // console.log(res[this.fileNames[0]]);
        this.cloud.putResultsAndImageAndUser(localStorage.getItem('user'), this.imageUrl, res['predictions']);
        this.response.push(res);
        // this.fileNames.shift();
        
      },

      (err) => {  
        console.log(err);
      }
    );
    
    this.router.navigate(['process']);
    this.saveResults.setJSONData(this.response);
  }

//   uploadFile_formdata() {

//       this.cloud.postFile_formdata(this.fileToUpload)
//         .subscribe(data => {  this.response=data['predictions'];
//         this.image64=data['image'];
//          //console.log(this.response);
//          this.router.navigate(['process']);
//          this.saveResults.setJSONData(this.response);
//          this.cloud.putResultsAndImageAndUser(localStorage.getItem('user'),this.imageUrl,this.response,this.image64);
         
//           });
//   }
// }
upload_test() {  
   
  const user = localStorage.getItem('user');

  let files = this.getFiles();
  console.log(files);
  let requests = [];
  files.forEach((file) => {
    let id = Math.random().toString(36).substring(2)+'.dcm';
    this.ref = this.afStorage.ref(user + '/' + id);
    this.task = this.ref.put(file.rawFile);
    let formData = new FormData();
    formData.append('file' , file.rawFile, file.name);
    // this.fileNames.push(file.name.replace(/\.[^/.]+$/, ""))
          
          requests.push(this.cloud.postFile_formdata(formData)); 
          
        });


  concat(...requests).subscribe(
    (res) => {
      
      console.log(res);
      // console.log(res[this.fileNames[0]]);
      this.response.push(res);
      this.cloud.putResultsAndImageAndUser(localStorage.getItem('user'),res['predictions']);
      // this.fileNames.shift();
      
    },

    (err) => {  
      console.log(err);
    }
  );
  
  this.router.navigate(['process']);
  this.saveResults.setJSONData(this.response);
}

}

