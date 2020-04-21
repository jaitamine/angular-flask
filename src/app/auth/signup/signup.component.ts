import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Log } from 'src/service/log.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router, private log: Log) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.authService.createNewUser(email, password).then(
      () => {
        localStorage.setItem('user', email);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error;
        console.log(error.message);
        this.log.logAngular(error.message );
      }
    );
  }

}
