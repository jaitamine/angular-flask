import { Cloud } from './../../service/cloud.service';

import { Component, OnInit, Input, Output } from '@angular/core';

import { UploadService } from 'src/service/upload.service';
import { Resp } from 'src/entities/resp';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/service/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Log } from 'src/service/log.service';
import * as Papa from 'papaparse';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  dataList : any[];
data3;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private cloud: Cloud ,private uploadService: AuthenticationService, private afStorage: AngularFireStorage, private log: Log) { }

  ngOnInit() {
  }

  upload(event) {

    const user = localStorage.getItem('user');
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(user + '/' + id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = this.ref.getDownloadURL())
    ).subscribe();
    (error) => {
      console.log(error.message)
      this.log.logAngular(error.message);
    };
  }
  onChange(files: File[]){
    
    if(files[0]){
      console.log(files[0]);
      Papa.parse(files[0], {
        
        skipEmptyLines: true,
        complete: (result,file) => {
          console.log(result);
          this.dataList = result.data;
          let numberArray1 = this.dataList[0].map(Number);
          let numberArray2 = this.dataList[1].map(Number);
          console.log(numberArray1);
          console.log(numberArray2);
          // this.data3=this.cloud.cloud(numberArray1,numberArray2);
          console.log(this.cloud.cloud(numberArray1,numberArray2))
        }
      });
    }
  }

}

