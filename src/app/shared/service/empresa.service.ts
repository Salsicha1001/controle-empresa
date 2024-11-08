import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  // Cria um BehaviorSubject com valor inicial 'null' (ou qualquer valor padrão que você preferir)
  private selectedValueSubject = new BehaviorSubject<any>(null);
  
  // Cria um Observable público para que outros componentes possam se inscrever
  selectedValue$ = this.selectedValueSubject.asObservable();

  constructor() {}

  // Função para atualizar o valor do select
  setSelectedValue(value: any): void {
    this.selectedValueSubject.next(value);
  }

  // Função para obter o valor atual (sem a necessidade de se inscrever)
  getSelectedValue(): any {
    return this.selectedValueSubject.value;
  }
}
