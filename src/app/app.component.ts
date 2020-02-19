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
  constructor(private authService: AuthenticationService, private router: Router) {
  }
  onLogout() {

    this.authService.logout();
    this.router.navigate(['/login']);


  }
}

