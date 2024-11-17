import { Component, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { EmpresaService } from 'src/app/shared/service/empresa.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selected = new FormControl();

  constructor(private empresaService: EmpresaService,private AuthService:AuthService) {}

  // Função chamada quando o valor do select mudar
  onSelectChange(value: any): void {
    this.empresaService.setSelectedValue(value);  // Envia o valor para o serviço
  }

  // Função para pegar o valor atual do serviço (por exemplo, ao clicar em um botão)
  ngOnInit() {
    this.selected.setValue('Salsicha3D')
  }
   isSalsicha3d(){
    return this.AuthService.getCurrentUser().email =='felumais14@gmail.com'
  }
}
