import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      take(1),
      map(isAuth => {
        if (isAuth) {
          return true;  // Permite o acesso à rota se o usuário estiver autenticado
        } else {
          this.router.navigate(['/login']);  // Redireciona para o login se não estiver autenticado
          return false;
        }
      })
    );
  }
}