
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Resp } from 'src/entities/resp';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    private host = 'http://127.0.0.1:9090/upload';
    private login_host = 'http://127.0.0.1:5000'
    private host_cloud = 'https://imagepredict-bnbtuguipq-ew.a.run.app/upload '
    private jwtToken = null;
    private roles: any[] = [];
  
    constructor(private http: HttpClient) {


    }

    login(user) {
        //    observe response pour ne pas convertir l'objet en json et recuperer directement la requete
        return this.http.post(this.login_host + '/auth/login', user, { observe: 'response' });

    }
    saveToken(jwt: string) {

        localStorage.setItem('token', jwt);
        // tslint:disable-next-line:prefer-const
        let jwtHelper: JwtHelperService = new JwtHelperService();
        this.jwtToken = jwt;
        console.log(this.jwtToken);
        //this.roles = jwtHelper.decodeToken(this.jwtToken).roles;


    }

 

    loadToken() {

        this.jwtToken = localStorage.getItem('token');
    }

    logout() {
        
        const endpoint = 'http://localhost:5000/upload/save_file';
        this.jwtToken = null;
        localStorage.removeItem('token');
        // return this.http.post(endpoint, );
        // need to persist thr blacklisted tokens
    }

    loggedIn(){

        return !!localStorage.getItem('token');;
    }

    isAdmin() {

        // tslint:disable-next-line:prefer-const
        for (let r of this.roles) {

            if (r.authority === 'ADMIN') { return true; }
        }
        return false;

    }

    saveFile(doc) {
        // tslint:disable-next-line:object-literal-key-quotes
        
        return this.http.post(this.host + '/save_file', doc, { headers: new HttpHeaders({ 'Authorization': this.jwtToken}) });

    }
    register(user) {
        return this.http.post(this.host + '/auth/register', user);
    }

    postFile( fileToUpload: File) {
        const endpoint = 'http://localhost:5000/upload/save_file';
        const formData = new FormData();
        formData.append('file', fileToUpload);
        if (this.jwtToken == null) this.loadToken();
        return this.http.post(endpoint, formData, {headers: new HttpHeaders({ 'Authorization': this.jwtToken })});
    }

    postFile_cloud(fileToUpload: File) {
        // tslint:disable-next-line:object-literal-key-quotes
        
        const formData = new FormData();
        //formData.append('file', fileToUpload);
        //if (this.jwtToken == null) this.loadToken();
        return this.http.post(this.host_cloud, fileToUpload);

    }

    postFile_formdata( fileToUpload: File) {
        const endpoint = this.host;
        const formData = new FormData();
        formData.append('file', fileToUpload);
        return this.http.post(endpoint, formData);
    }
    

}
