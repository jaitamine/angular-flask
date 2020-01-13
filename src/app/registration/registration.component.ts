import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: any;
  mode: any;
  errorMessage: any;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onRegister(user) {
    this.authService.register(user)
      .subscribe(data => {
        console.log(data);
        this.user = data; 
        this.mode = 1;
      },
        err => {
          this.errorMessage = err.error.message; this.mode = 0;
        });
  }

}
