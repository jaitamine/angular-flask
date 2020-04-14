import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode: number;
  jwt : any;
  fullname: any;
  email: any;
  password: any; 
  constructor(public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {

   
  }


  onLogin(user) {

      this.authService.login(user).subscribe(resp => {
      // tslint:disable-next-line:prefer-const
      this.jwt = resp.body['Authorization'];
      console.log(this.jwt);
      this.authService.saveToken(this.jwt);
      this.router.navigate(['/upload']);
      

    });

  }

//  onLogout(){

//   this.authService.logout();
//   this.status = false;
//   this.router.navigate(['/login']);
//  }

}
