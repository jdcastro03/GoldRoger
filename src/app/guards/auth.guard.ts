import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {inject} from "@angular/core";

export const AuthGuardService: CanActivateFn = () => {

 let isauthenticated = inject(AuthService).isAuthenticated();
 let router = inject(Router);

     if (isauthenticated) {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
};