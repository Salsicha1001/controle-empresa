import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: firebase.User | null = null;
  constructor(public authService: AuthService,private router:Router) {

  }
  login() {
    this.authService.loginWithGoogle().then((res)=>{
      this.router.navigate(['/home'])
    });
  }
  logout() {
    this.authService.logout();
  }
}
