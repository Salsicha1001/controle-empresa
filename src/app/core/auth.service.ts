import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from 'firebase/auth'; // Corrigido para o SDK Modular
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;
  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState; // Acompanhando o estado de autenticação do usuário
  }

  private getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  private removeUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

  private saveUserToLocalStorage(user: any) {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    localStorage.setItem('user', JSON.stringify(userData)); // Salva o usuário no localStorage
  }
  loginWithGoogle() {
    // Acesso à instância de auth
    const auth = getAuth(); // Usando a função getAuth do Firebase Modular SDK
    const provider = new GoogleAuthProvider(); // Criando o provedor do Google

    return signInWithPopup(auth, provider) // Usando signInWithPopup do Firebase Modular SDK
      .then((result) => {
        // Sucesso no login
        console.log('Usuário logado com Google:', result);
        this.saveUserToLocalStorage(result.user);
        return result.user; // Retornando o usuário logado
      })
      .catch((error) => {
        // Em caso de erro
        console.error('Erro no login com Google:', error);
        throw error;
      });
  }

  // Método de logout
  logout() {
    const auth = getAuth(); // Usando a função getAuth do Firebase Modular SDK
    return signOut(auth) // Logout usando o método signOut da API Modular
      .then(() => {
        console.log('Usuário deslogado');
        // Remove as informações do usuário do localStorage
        this.removeUserFromLocalStorage();
      })
      .catch((error) => {
        console.error('Erro no logout:', error);
      });
  }

  get isAuthenticated(): Observable<boolean> {
    const user = this.getUserFromLocalStorage();
    return new Observable<boolean>((observer) => {
      observer.next(!!user); // Retorna true se o usuário estiver presente no localStorage
      observer.complete();
    });
  }
  getCurrentUser() {
    return this.getUserFromLocalStorage();
  }
}
