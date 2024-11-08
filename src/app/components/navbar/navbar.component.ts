import { Component, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/shared/service/empresa.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selected = new FormControl();

  constructor(private empresaService: EmpresaService) {}

  // Função chamada quando o valor do select mudar
  onSelectChange(value: any): void {
    this.empresaService.setSelectedValue(value);  // Envia o valor para o serviço
  }

  // Função para pegar o valor atual do serviço (por exemplo, ao clicar em um botão)
  getCurrentValue() {
    const value = this.empresaService.getSelectedValue();
    console.log('Valor selecionado no serviço:', value);
  }
}
