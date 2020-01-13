import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode: number;
  
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }


  onLogin(user) {

      this.authService.login(user).subscribe(resp => {
      // tslint:disable-next-line:prefer-const
      let jwt = resp.headers.get('Authorization');
      // console.log(jwt);
      this.authService.saveToken(jwt);
      this.router.navigate(['/upload']);

    }, err => {
      this.mode = 1;
    });

  }

}
