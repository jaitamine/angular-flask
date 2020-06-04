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
import * as firebase from 'firebase';
import { ResultsService } from 'src/service/results.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  fileToUpload: File = null;
  dataList: any[];
  data3;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  results;
  imageUrl: string;
  response: any;
  image64:any;
  constructor(private saveResults:ResultsService,private router: Router, private cloud: Cloud, private uploadService: AuthenticationService, private afStorage: AngularFireStorage, private log: Log) { }

  ngOnInit() {
  }


  upload(files: FileList) {

    const user = localStorage.getItem('user');
    const id = Math.random().toString(36).substring(2)+'.dcm';
    this.ref = this.afStorage.ref(user + '/' + id );
    var metadata = {
      contentType: 'dcm',
    };
    this.task = this.ref.put(files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
      this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => { this.imageUrl = url;
          this.fileToUpload=files[0];
          this.uploadFile_formdata();
        });
      })
    ).subscribe();
    (error) => {
      console.log(error.message)
      this.log.logAngular(error.message);
    };
  }
  navugationResult() {
    this.Stringprocess(this.imageUrl);
    setTimeout(() => {
      this.router.navigate(['/process']);
    }, 100),
      (error) => {
        console.log(error.message);
        this.log.logAngular(error.message);
      };
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
  Stringprocess(url: any) {
    this.toDataURL(url, function (dataUrl) {
      //console.log(dataUrl);
      localStorage.setItem('base64', dataUrl.replace('data:image/png;base64,', ''));
    }),
      (error) => {
        console.log(error.message);
        this.log.logAngular(error.message);
      };
  }
  uploadFile_formdata() {
    if (this.fileToUpload == null) {
      alert('You must choose a file first!');
    } else {
      this.cloud.postFile_formdata(this.fileToUpload)
        .subscribe(data => { console.log(data); this.response=data['predictions'];
        this.image64=data['image'];
         //console.log(this.response);
         this.router.navigate(['process']);
         this.saveResults.setJSONData(this.response);
         this.cloud.putResultsAndImageAndUser(localStorage.getItem('user'),this.imageUrl,this.response,this.image64);
         
          });
  }
}
}

