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
            this.router.navigate(['/user',  user.id ]);
          },
          err => {
            console.log(err);
            this.loggedIn = false;
          }
        );
    }
  }
}
