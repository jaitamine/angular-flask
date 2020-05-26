import { Component } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  status = true;
  constructor(public authService: AuthenticationService, public router: Router) {
    const config = {
      apiKey: "AIzaSyCAlHruZTXVqkKFFASkaWXrJwkDo_7Mbuk",
      authDomain: "angular-datebase.firebaseapp.com",
      databaseURL: "https://angular-datebase.firebaseio.com",
      projectId: "angular-datebase",
      storageBucket: "angular-datebase.appspot.com",
      messagingSenderId: "175017371011",
      appId: "1:175017371011:web:b1bb4f6a8a49377096c2b6",
      measurementId: "G-3BSQKW0GNG"
    };
    firebase.initializeApp(config);
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  home() {
    this.router.navigate(['/home']);
  }
  about() {
    this.router.navigate(['/about']);
  }
 
}
