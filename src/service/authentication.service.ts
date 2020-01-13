
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {
    private host = 'http://localhost:8081';
    private jwtToken = null;
    private roles: any[] = [];
    constructor(private http: HttpClient) {


    }

    login(user) {
        //    observe response pour ne pas convertir l'objet en json et recuperer directement la requete
        return this.http.post(this.host + '/login', user, { observe: 'response' });

    }
    saveToken(jwt: string) {

        localStorage.setItem('token', jwt);
        // tslint:disable-next-line:prefer-const
        let jwtHelper: JwtHelperService = new JwtHelperService();
        this.jwtToken = jwt;
        console.log(this.jwtToken);
        this.roles = jwtHelper.decodeToken(this.jwtToken).roles;


    }

 

    loadToken() {

        this.jwtToken = localStorage.getItem('token');
    }

    logout() {

        this.jwtToken = null;
        localStorage.removeItem('token');
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
        return this.http.post(this.host + '/saveFile', doc, { headers: new HttpHeaders({ 'Authorization': this.jwtToken }) });



    }
    register(user) {
        return this.http.post(this.host + '/register', user);
    }

}
