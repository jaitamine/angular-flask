import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/share';
import { ResponseObject } from '../entities/ResponseObject';


@Injectable({ providedIn: 'root' })
export class UploadService {

    constructor(private http: HttpClient) { }


    postFile(title: string, fileToUpload: File) {
        const endpoint = 'http://localhost:8088/';
        const formData = new FormData();
        formData.append('title', title);
        formData.append('files', fileToUpload, fileToUpload.name);
        return this.http.post<ResponseObject>(endpoint, formData, { observe: 'response' });

    }



}