import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({ providedIn: 'root' })
export class UploadFileService {
  imageDetailList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('users');
    //console.log(this.imageDetailList)
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }
}