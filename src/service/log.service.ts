import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resp } from 'src/entities/resp';
// import 'rxjs/add/operator/share';

@Injectable({ providedIn: 'root' })
export class Log {
  json;
  URL = 'https://hooks.slack.com/services/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';
  constructor(private http: HttpClient) { }
  logAngular(text2: any) {
    return this.http.post(this.URL, JSON.stringify({ "text": text2 }), { responseType: 'text' }).toPromise().then((data: any) => {
      console.log(data);
      console.log(text2)
      this.json = JSON.stringify(data.json);
    });
  }
  handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return console.log(errMsg);
  }
}