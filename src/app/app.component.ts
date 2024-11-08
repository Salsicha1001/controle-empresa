import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';
import { SpinnerService } from './components/load/load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user$: any;

  constructor(private authService: AuthService, private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user$ = user;  // Armazena os dados do usuário
        console.log('Usuário logado:', this.user$);
      } else {
        console.log('Usuário não autenticado');
        this.router.navigate(['/login']);  // Redireciona para o login se o usuário não estiver autenticado
      }
    });
  }

}
