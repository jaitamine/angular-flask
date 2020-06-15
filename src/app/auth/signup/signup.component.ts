import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Log } from "src/service/log.service";
import { Cloud } from "src/service/cloud.service";
import { AuthenticationService } from "src/service/authentication.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import {
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { UploadFileService } from "src/service/UploadFileService.service";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  signupForm: FormGroup;
  errorMessage: string;
  imageUrl: string;
  constructor(
    private afStorage: AngularFireStorage,
    private cloud: Cloud,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private log: Log
  ) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.signupForm = this.formBuilder.group({
      name: [""],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
    });
  }

  onSubmit() {
    const email = this.signupForm.get("email").value;
    sessionStorage.setItem("email", email);
    const password = this.signupForm.get("password").value;
    const name = this.signupForm.get("name").value;
    sessionStorage.setItem("name", name);
    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(["dashboard"]);
        localStorage.setItem("user", email);
        
        // this.cloud.putUser(name,email,password,image);
      },
      (error) => {
        this.errorMessage = error;
        console.log(error.message);
        this.log.logAngular(error.message);
      }
    );
  }
  upload(event) {
    const user = "imagesImage";
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
            this.imageUrl = url;
          });
        })
      )
      .subscribe();
    (error) => {
      console.log(error.message);
      this.log.logAngular(error.message);
    };
  }
  signin() {
    this.router.navigate(["auth/signin"]);
  }
}
