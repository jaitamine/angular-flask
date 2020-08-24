import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Log } from 'src/service/log.service';
import { Observable, throwError } from 'rxjs';
import { finalize, tap, map, catchError } from 'rxjs/operators';
import { Cloud } from 'src/service/cloud.service';
import { ResultsService } from 'src/service/results.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/service/upload.service';

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File = null;   

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  responseList : any[] = [];
  response : any;
  sensor : boolean = false;
  

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private cloud : Cloud,
     private log: Log, private resultsService:ResultsService, private uploadService : UploadService,
     private router: Router) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    
    const user = localStorage.getItem('user');
    const id = Math.random().toString(36).substring(2)+'.dcm';

    // The storage path
    const path = user + '/' + id ;

    // Reference to storage bucket
    const ref : AngularFireStorageReference = this.storage.ref(path);


    this.task = ref.put(this.file);
    // this.task = this.storage.upload(path, this.file);

    this.percentage = this.task.percentageChanges();
    // Progress monitoring
    
    this.snapshot = this.task.snapshotChanges().pipe(map(s => s.state));
    

    this.task.snapshotChanges().pipe(
      //tap(console.log),
      // The file's download URL
      finalize( () =>  {
        this.downloadURL = ref.getDownloadURL();
        this.downloadURL.subscribe(url => {          
          this.uploadFile_formdata(url, user);
                    
        });
                
        //catchError(e => throwError(e));
        
      }),
      
    ).subscribe();
    (error) => {
    
      this.log.logAngular(error.message);
    }
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  uploadFile_formdata(url, user)  {
        
        
        this.cloud.postFile_formdata(this.file)
        .subscribe(data => {this.response=data['predictions'];      
         this.cloud.putResultsAndImageAndUser(user , url, this.response);
         this.uploadService.setJSONData(data);                
          });
          
  }
}
