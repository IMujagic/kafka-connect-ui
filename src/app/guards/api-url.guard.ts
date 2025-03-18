import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlGuard implements CanActivate {
  
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.storageService.hasApiUrl()) {
      return true;
    }
    
    // Redirect to landing page if API URL is not set
    this.router.navigate(['/']);
    return false;
  }
}
