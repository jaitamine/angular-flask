
import { Component, OnInit, Input, Output } from '@angular/core';

import { UploadService } from 'src/service/upload.service';
import { Resp } from 'src/entities/resp';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/service/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import {Observable} from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import {  AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private uploadService: AuthenticationService, private afStorage: AngularFireStorage) { }

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
 )
.subscribe();
  }
}

