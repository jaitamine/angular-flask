import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import 'rxjs/add/operator/share';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class Cloud {
    URL = 'https://us-central1-rh-click-version-1.cloudfunctions.net/predict-1';
    json;
    
    constructor(private http: HttpClient) { }
    cloud(data1: any[],data2:any[]) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
      return this.http.post<any[]>(this.URL, JSON.stringify({"list":[data1,data2]}),options).toPromise().then((data3: any[] ) => {
      //  this.json = JSON.stringify(data3.json);
       console.log(data3);
      });
    }

}