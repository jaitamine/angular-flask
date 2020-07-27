import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: "root"
})
export class ResultsService {
  jsonData: any;
  private dataSource = new BehaviorSubject({});
  data = this.dataSource.asObservable();

  constructor() {
    this.jsonData = {};
  }
  setJSONData(val: object) {
    this.dataSource.next(val);
  }
  getJSONData() {
    return this.data;
  }

}