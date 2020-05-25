import { Component, OnInit, Input, Output } from "@angular/core";

import { UploadService } from "src/service/upload.service";
import { Resp } from "src/entities/resp";
import { HttpResponse } from "@angular/common/http";
import { AuthenticationService } from "src/service/authentication.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import {
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { Log } from "src/service/log.service";
import * as Papa from "papaparse";
import { Router } from "@angular/router";
import { Cloud } from "src/service/cloud.service";
@Component({
  selector: "app-information",
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.css"],
})
export class InformationComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  results;
  imageUrl: string;
  constructor(
    private router: Router,
    private cloud: Cloud,
    private uploadService: AuthenticationService,
    private afStorage: AngularFireStorage,
    private log: Log
  ) {}
  ngOnInit() {}
  addimage() {
    localStorage.setItem("image", this.imageUrl);
    this.cloud.putUser(
      sessionStorage.getItem("name"),
      sessionStorage.getItem("email"),
      this.imageUrl
    );
    this.cloud.getUser(sessionStorage.getItem("email"));
  }
  upload(event) {
    const user = "images/";
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(user + "/" + id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map((s) => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            (this.imageUrl = url), sessionStorage.setItem("image", url);
          });
        })
      )
      .subscribe();
    (error) => {
      console.log(error.message);
      this.log.logAngular(error.message);
    };
  }
}
