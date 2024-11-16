import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private permissionService: PermissionService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;

    if (!this.sessionExists()) {
      this.redirectTo('/login');
      return of(false);
    }

    return this.checkPermissionForScreen(url);
  }

  checkPermissionForScreen(url: string): Observable<boolean> {
    const userId = this.authService.currentUser?.userId;
    if (!userId) {
      this.redirectTo('/login');
      return of(false);
    }

    return this.permissionService.getUserPermissionKeys(userId).pipe(
      map(permissionKeys => {
        const requiredPermission = this.getRequiredPermissionForUrl(url);
        console.log('Permisos del usuario:', permissionKeys);
        console.log('Permiso requerido:', requiredPermission);
    
        const hasPermission = Object.values(permissionKeys).includes(requiredPermission);
    
        if (hasPermission) {
          return true;
        } else {
          this.redirectTo('/sinAcceso');
          return false;
        }
      })
    );
  }

  getRequiredPermissionForUrl(url: string): string {
    switch (url) {
      case '/organizer':
        return 'ORGANIZER_READ';
      case '/coachTeam':
        return 'COACH_READ';
      default:
        return ''; 
    }
  }

  sessionExists(): boolean {
    return this.authService.isAuthenticated();
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}