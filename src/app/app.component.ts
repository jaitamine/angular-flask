import { Component } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  status = true;
  constructor(public authService: AuthenticationService, public router: Router) {
  }
  onLogout() {

    this.authService.logout();
    this.router.navigate(['/login']);
  }
  home(){
    this.router.navigate(['/home']);
  }
  about(){
    this.router.navigate(['/about']);
  }
}

