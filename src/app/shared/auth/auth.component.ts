import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor (private authService: AuthService, private router: Router) {}

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode () {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit (authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, error => {
      console.log(error);
      this.error = error;
      this.isLoading = false;
    });

    authForm.reset();
  }

  onHandleError () {
    this.error = null;
  }
}
