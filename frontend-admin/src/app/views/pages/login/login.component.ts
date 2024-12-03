import { Component } from '@angular/core';
import { AuthService } from './../../../core/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthStorageService } from './../../../core/services/auth-storage.service';
import { Router } from '@angular/router';
import { LoadingState } from 'src/app/core/models/loading-state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public validationErrors: {
    [key: string]: any;
  } = {};
  public form: FormGroup;
  public loading: LoadingState = {
    post: false,
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authStorageService: AuthStorageService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.loading.post = true;
      this.validationErrors = {};
      this.authService.login(username, password).subscribe({
        next: (token_data) => {
          this.authStorageService.saveAccessToken(token_data.access || null);
          this.authService.getUser().subscribe({
            next: (user_data) => {
              this.authService.isLoggedIn = true;
              this.authStorageService.saveUser(user_data);
              this.router.navigate(['dashboard']);
            },
            error: () => {
              this.loading.post = false;
            },
          });
        },
        error: (error) => {
          this.loading.post = false;
          if (
            error.status == 400 ||
            error.status == 401 ||
            error.status == 422
          ) {
            const errors = { ...error.error };
            this.validationErrors = errors;
          }
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}