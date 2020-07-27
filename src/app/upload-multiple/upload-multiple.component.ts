import { Component, OnInit, Input } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat, merge, Observable } from 'rxjs';
import { Cloud } from 'src/service/cloud.service';
import { Router } from '@angular/router';
import { ResultsService } from 'src/service/results.service';
import { AngularFireStorageReference, AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { UploadService } from 'src/service/upload.service';

@Component({
  selector: 'app-upload-multiple',
  templateUrl: './upload-multiple.component.html',
  styleUrls: ['./upload-multiple.component.css']
})
export class UploadMultipleComponent implements OnInit {
  
  // public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  
  downloadURL: Observable<string>;


  constructor(private cloud : Cloud, private router: Router, private saveResults:ResultsService,
     private afStorage: AngularFireStorage, private uploadService : UploadService) {}

  ngOnInit() {
  }

  isHovering: boolean;

  files: File[] = [];
  results : any[] = [];
  diff : number = 0;

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      console.log(files.item(i));
    }

    //waits for data from children on by one
    this.uploadService.getJSONData().subscribe(data=>{
      this.results.push(data);
      console.log(this.results);

    // checks if all the results are in recieved from backend
      if (this.results.length -1 === this.files.length){
        
        console.log("going to dashboard");
        
        this.router.navigate(['/dashboard']);
              
      }
      

      
  });

  
}
}






