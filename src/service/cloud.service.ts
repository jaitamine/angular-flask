import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import 'rxjs/add/operator/share';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class Cloud {
    URL = 'https://us-central1-rh-click-version-1.cloudfunctions.net/predict-1';
    URL2='https://us-central1-histopathology-hackathon.cloudfunctions.net/predict_image'
    json;
    result:string;
    constructor(private http: HttpClient) { }
    cloud(data1: any[],data2:any[]) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
     return this.http.post<Object>(this.URL, JSON.stringify({"list":[data1,data2]}),options).toPromise().then((data3 ) => {
      this.result=JSON.stringify(data3);
      localStorage.setItem("rsults",this.result);
      console.log(this.result)
       
      });
    }
    ImageProcessing(image:any){
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
     return this.http.post<Object>(this.URL2, JSON.stringify({"file":image }),options).toPromise().then((data3 ) => {
      this.result=JSON.stringify(data3);
      localStorage.setItem("results",this.result);
      console.log(this.result)
    })}
}