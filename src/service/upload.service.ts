import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resp } from 'src/entities/resp';
// import 'rxjs/add/operator/share';


@Injectable({ providedIn: 'root' })
export class UploadService {

    constructor(private http: HttpClient) { }


    // postFile( fileToUpload: File) {
    //     const endpoint = 'http://localhost:5000/upload/save_file';
    //     const formData = new FormData();
    //     formData.append('file', fileToUpload);
    //     return this.http.post<Resp>(endpoint, formData, {headers: new HttpHeaders({ 'Authorization': this.jwtToken})}, { observe: 'response' });
        
    // }
    



}



