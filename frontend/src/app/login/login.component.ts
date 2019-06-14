import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // passwordError = 'You must enter the password';
  // incorrectLogin = false;
  loggedIn: boolean;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

    console.log(this.loginForm);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loggedIn = true;

      const nazwa = this.loginForm.controls.name.value.trim();
      const haslo = this.loginForm.controls.password.value;

      this.auth.login({ nazwa, haslo } as User)
        .subscribe((user) => {
            console.log('DATA LOGIN USER' + JSON.stringify(user));
            this.router.navigate(['/user',  user.id ]);
          },
          err => {
            console.log(err);
            this.loggedIn = false;
          }
        );
    }
  }





  // getErrorMessage(loginError?: any) {
  //   return this.loginForm.controls.email.hasError('required') ? 'You must enter a value' :
  //       this.loginForm.controls.email.hasError('email') ? 'Not a valid email' :
  //           '';
  // }

}
