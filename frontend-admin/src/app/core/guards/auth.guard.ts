import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Constants } from '../../constants/Constants';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn) {
    return true;
  }
  router.navigate([Constants.LOGIN_ROUTE], {
    queryParams: { loggedOut: true, origUrl: state.url },
  });
  return true;
};
