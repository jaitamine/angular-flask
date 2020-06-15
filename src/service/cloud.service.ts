import { FileUpload } from "./../entities/FileUpload";
import { AngularFireStorage } from "@angular/fire/storage";
import { element } from "protractor";
import { Router } from "@angular/router";
import { ConstServer } from "./const.service";
import { User } from "src/entities/user";
import { Injectable } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
// import 'rxjs/add/operator/share';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Log } from "./log.service";
import { Observable } from "rxjs/internal/Observable";
import * as firebase from "firebase";
import { storage } from "firebase";
import { AngularFireList } from "@angular/fire/database/database";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase,
} from "angularfire2/database";

@Injectable({ providedIn: "root" })
export class Cloud {
  storage: any;
  userName;
  userEmail;
  storages: Storage;
  UserUrl;
  base_path =
    " https://console.firebase.google.com/project/angular-datebase/storage/angular-datebase.appspot.com/files~2F";
  fileUpload: FileUpload;
  private host_cloud = "https://imagepredict-bnbtuguipq-ew.a.run.app/upload";
  private host = "http://127.0.0.1:7000"
  URL = "https://us-central1-rh-click-version-1.cloudfunctions.net/predict-1";
  URL2 =
    "https://us-central1-histopathology-hackathon.cloudfunctions.net/predict_image";
  json;
  result: string;
  error: any;
  database = firebase.database();

  constructor(
    private consServer: ConstServer,
    private roter: Router,
    private http: HttpClient,
    private log: Log
  ) {}
  cloud(data1: any[], data2: any[]) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers };
    return this.http
      .post<Object>(this.URL, JSON.stringify({ list: [data1, data2] }), options)
      .toPromise()
      .then((data3) => {
        this.result = JSON.stringify(data3);
        localStorage.setItem("rsults", this.result);
        return console.log(this.result);
      })
      .catch(this.log.handleError)
      .catch(this.log.logAngular);
  }
  ImageProcessing(image: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers };
    return this.http
      .post<Object>(this.URL2, JSON.stringify({ file: image }), options)
      .toPromise()
      .then((data3) => {
        this.result = JSON.stringify(data3);
        localStorage.setItem("results", this.result);
        console.log(this.result);
      })
      .catch(this.log.handleError)
      .catch(this.log.logAngular);
  }
  putUser(name: any, email: any, image: any) {
    firebase.database().ref("users/").push({
      username: name,
      email: email,
      image: image,
    });
    //it must be on the server side not client side
  }
  getUser(email: string): any[] {
    var UserData = [];

    const wantedOrder = firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(email)
      .on("child_added", function (snapshot) {
        UserData.push(snapshot.child("username").val());
        UserData.push(snapshot.child("email").val());
        UserData.push(snapshot.child("image").val());
      });
    setTimeout(() => {
      this.getList(email);
      // console.log(UserData);
      this.consServer.setCons(UserData[0], UserData[1], UserData[2]);
    }, 600);
    return UserData;
  }
  postFile_formdata(fileToUpload: File) {
    const formData = new FormData();
    formData.append("file", fileToUpload);
    return this.http.post(this.host_cloud, formData);
  }
  getUserDicom(email: string): any[] {
    var UserData = [];

    const wantedOrder = firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(email)
      .on("child_added", function (snapshot) {
        UserData.push(snapshot.child("username").val());
        UserData.push(snapshot.child("email").val());
        UserData.push(snapshot.child("image").val());
      });
    setTimeout(() => {
      this.getListDicom(email);
      // console.log(UserData);
      this.consServer.setCons(UserData[0], UserData[1], UserData[2]);
    }, 600);
    return UserData;
  }

  putResultsAndImageAndUser(
    email: any,
    imageUrl: any,
    result: any,
    image64: any
  ) {
    firebase.database().ref("imageResults/").push({
      email: email,
      imageUrl: imageUrl,
      result: result,
      image64: image64,
      date: new Date().toLocaleDateString(),
    });
  }
  getList(email: string) {
    var List: any[];
    List = [];

    const wantedOrder = firebase
      .database()
      .ref("imageResults")
      .orderByChild("email")
      .equalTo(email)
      .on("child_added", function (snapshot) {
        List.push({
          imageUrl: snapshot.child("imageUrl").val(),
          result: snapshot.child("result").val(),
          image64: snapshot.child("image64").val(),
          date: snapshot.child("date").val(),
        });
        // List.push({"result":snapshot.child("result").val()})
        // List.push({"image64":snapshot.child('image64').val()})
      });
    setTimeout(() => {
      //this.consServer.setnumberOfImage(List.length);
      this.consServer.setList(List);
    }, 500);
    return List;
  }
  getListDicom(email: string) {
    var List: any[];
    List = [];

    const wantedOrder = firebase
      .database()
      .ref("imageResults")
      .orderByChild("email")
      .equalTo(email)
      .on("child_added", function (snapshot) {
        List.push(snapshot.child("imageUrl").val());
      });

    setTimeout(() => {
      this.consServer.setnumberOfImage(List.length);
      this.consServer.setListDicom(List);
    }, 500);
    return List;
  }
}
