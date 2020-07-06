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
  requests : any[] = [];
  
  downloadURL: Observable<string>;


  constructor(private cloud : Cloud, private router: Router, private saveResults:ResultsService, private afStorage: AngularFireStorage) {}

  ngOnInit() {
  }

  // fileOverBase(event):  void {
  //   this.hasBaseDropZoneOver  =  event;
  // }

  // getFiles(): FileLikeObject[] {
  //   return this.uploader.queue.map((fileItem) => {
  //     return fileItem.file;
  //   });
  // }

  // upload() {  

  //   const user = localStorage.getItem('user');

  //   let files = this.getFiles();
  //   console.log(files);
  //   files.forEach((file) => {

  //     let formData = new FormData();
  //     formData.append('file' , file.rawFile, file.name);
  //     this.fileNames.push(file.rawFile);
  //     this.requests.push(this.cloud.postFile_formdata(formData));  
  //   });

  //   concat(...this.requests).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.response.push(res);       
  //       let id = Math.random().toString(36).substring(2)+'.dcm';
  //       this.ref = this.afStorage.ref(user + '/' + id);
  //       console.log(this.ref);
  //       this.task = this.ref.put(this.fileNames[0]);
  //       this.fileNames.shift();
  //       this.task.snapshotChanges().pipe(
  //       finalize(async() => {          
  //         this.downloadURL = await this.ref.getDownloadURL().toPromise();
  //           this.downloadURL.subscribe(url => { 
  //             this.cloud.putResultsAndImageAndUser(user, url, res['predictions']);           
  //             console.log(url)
  //           });
  //         })
  //       );
        
  //     },
  //     (err) => {  
  //       console.log(err);
  //     }
  //   );
    
  //   this.router.navigate(['process']);
  //   this.saveResults.setJSONData(this.response);
  // }

  isHovering: boolean;

  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      console.log(files.item(i));
    }
    
  }
}







