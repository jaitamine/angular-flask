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
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit  {
  dataList : any[];
data3;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  results;
  imageUrl: string;
  constructor(private router:Router,private cloud: Cloud ,private uploadService: AuthenticationService, private afStorage: AngularFireStorage, private log: Log) { }

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
      finalize(() => {this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url=>{this.imageUrl = url});
    })
    ).subscribe();
    (error) => {
      console.log(error.message)
      this.log.logAngular(error.message);
    }; 
  }
  navugationResult(){
    this.Stringprocess(this.imageUrl); 
    setTimeout(() => {
      this.router.navigate(['/process']);
  }, 2000); 
  }
  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
    
}
Stringprocess(url: any ){
  this.toDataURL(url, function (dataUrl) {
    console.log(dataUrl);
  localStorage.setItem('base64', dataUrl.replace('data:image/png;base64,' , ''));
        })
}


}

