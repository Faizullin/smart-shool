import { Component, OnInit } from '@angular/core';

import { INavRolesData, navItems } from './_nav';
import { AuthStorageService } from 'src/app/core/services/auth-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  public navItems: INavRolesData[] = [];

  constructor(private authStorageService: AuthStorageService) {}

  ngOnInit(): void {
    const newNavItems: INavRolesData[] = [];
    const user = this.authStorageService.getUser();
    const user_roles = user?.roles || [];
    if (user_roles.length > 0) {
      navItems.forEach((navItem) => {
        let found = false;
        if (navItem.roles === undefined) {
          found = true;
        } else {
          navItem.roles?.forEach((role) => {
            if (user_roles.includes(role)) {
              found = true;
            }
          });
        }
        if (found) {
          newNavItems.push(navItem);
        }
      });
      this.navItems = newNavItems;
    }
  }
}
