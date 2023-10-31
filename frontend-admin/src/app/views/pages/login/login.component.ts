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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authStorageService: AuthStorageService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(email, password).subscribe({
        next: (token_data) => {
          this.authStorageService.saveAccessToken(token_data.access || null);
          this.authService.getUser().subscribe({
            next: (user_data) => {
              this.authService.isLoggedIn = true;
              this.authStorageService.saveUser(user_data);
              this.router.navigate(['dashboard']);
              // this.isLoginFailed = false;
              // this.isLoggedIn = true;
              // this.roles = this.storageService.getUser().roles;
              // this.reloadPage();
            },
            error: () => {
              // this.errorMessage = err.error.message;
              // this.isLoginFailed = true;
            },
          });
        },
        error: () => {},
      });
    }
  }
}
