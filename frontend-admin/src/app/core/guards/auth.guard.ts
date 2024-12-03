import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Constants } from '../../constants/Constants';
import { AuthStorageService } from '../services/auth-storage.service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const authStorageService = inject(AuthStorageService);
  const router = inject(Router);
  if (!authService.isLoggedIn) {
    authStorageService.clean();
    router.navigate([Constants.LOGIN_ROUTE], {
      queryParams: { loggedOut: true, origUrl: state.url },
    });
    return true;
  }
  const user = authStorageService.getUser();
  if (!user?.roles) {
    authStorageService.clean();
    router.navigate([Constants.LOGIN_ROUTE], {
      queryParams: { loggedOut: true, origUrl: state.url },
    });
    return true;
  }
  if (!(user.roles.includes('admin') || user.roles.includes('teacher'))) {
    authStorageService.clean();
    router.navigate([Constants.LOGIN_ROUTE], {
      queryParams: { loggedOut: true, origUrl: state.url },
    });
    return true;
  }
  return true;
};
