import { UploadFileService } from 'src/service/UploadFileService.service';
import { UploadService } from './../../../service/upload.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  imageList: any[];
  rowIndexArray: any[];

  constructor(private service: UploadFileService,private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.service.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => { return item.payload.val(); });
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    );
    
  }

}
