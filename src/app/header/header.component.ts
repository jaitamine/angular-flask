import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 
  isAuth: boolean;

  constructor(private authService: AuthenticationService, private router:Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.router.navigate(['/home']);
    this.authService.signOutUser();
    localStorage.clear();
  }
  upload(){
    this.router.navigate(['/upload']);
  }

}
