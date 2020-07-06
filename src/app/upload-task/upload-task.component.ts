import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Log } from 'src/service/log.service';
import { Observable } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';
import { Cloud } from 'src/service/cloud.service';

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
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private cloud : Cloud, private log: Log) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

    
    const user = localStorage.getItem('user');
    const id = Math.random().toString(36).substring(2)+'.dcm';

    // The storage path
    const path = user + '/' + id ;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(map(s => s.state));

    this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.uploadFile_formdata(this.downloadURL, user);

        //this.db.collection('imageResults').add( { downloadURL: this.downloadURL, path, user });
      }),
    ).subscribe();
    (error) => {
    
      this.log.logAngular(error.message);
    };
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  uploadFile_formdata(url, user) {

      this.cloud.postFile_formdata(this.file)
        .subscribe(data => {  let response=data['predictions'];
         console.log(data)
         this.cloud.putResultsAndImageAndUser(user , url, response);         
          });
  }
}
