import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  // Controla o estado do spinner (true: ativado, false: desativado)
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor() {}

  // Método para ativar o spinner
  show() {
    this.loadingSubject.next(true);
  }

  // Método para desativar o spinner
  hide() {
    this.loadingSubject.next(false);
  }
}
