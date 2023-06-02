import { Observable, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch , CanActivate{
  constructor( private authService:AuthService,
    private router:Router
    ) { }

  private checkAuthStatus():boolean|Observable<boolean>{
    return this.authService.checkAuthStatus()
    .pipe(
      tap(isAuthenticated =>{
        if(isAuthenticated){
          //si quieres usar navigate es con el .
          //al inicio por que necesita toda la ruta
          //this.router.navigate(['./auth/login']);
          this.router.navigateByUrl('/');
        }
      }),
      map(isAuthenticated =>!isAuthenticated)
    );
  }

  canMatch(route:Route,segments:UrlSegment[]):boolean|Observable<boolean>{
    return this.checkAuthStatus();
  }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean|Observable<boolean>{
    return this.checkAuthStatus();
  }
}
