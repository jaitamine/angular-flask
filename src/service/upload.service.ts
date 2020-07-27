import { Injectable } from '@angular/core';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resp } from 'src/entities/resp';
// import 'rxjs/add/operator/share';


@Injectable({ providedIn: 'root' })
export class UploadService {

    jsonData: any;
    private dataSource = new BehaviorSubject({});
    data = this.dataSource.asObservable();


    jsonInfo: any;
    private routeGo = new BehaviorSubject({});
    go = this.routeGo.asObservable();
  
    constructor() {
      this.jsonData = {};
    }
    setJSONData(val: object) {
      this.dataSource.next(val);
    }
    getJSONData() {
      return this.data;
    }

  setGoData(val: boolean) {
    this.routeGo.next(val);
  }
  getGoData() {
    return this.go;
  }
    





}
