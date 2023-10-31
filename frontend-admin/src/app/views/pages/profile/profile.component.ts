import { Component } from '@angular/core';
import { AuthService } from './../../../core/services/auth.service';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user_data: any;
  constructor(private authStorageService: AuthStorageService) {
    this.user_data = authStorageService.getUser();
  }
}
