import { Component } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../environments/environment'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  status = true;
  constructor(public authService: AuthenticationService, public router: Router) {
    const config = environment.firebase;
  
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
