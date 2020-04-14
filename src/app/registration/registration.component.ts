import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/entities/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: any;
  fullname: any;
  email: any;
  password: any; 

  constructor(public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
  }

  onRegister(user) {
    this.authService.register(user)
      .subscribe(data => {
        console.log(data);
        this.user = data; 
      },
      );
  }

}
