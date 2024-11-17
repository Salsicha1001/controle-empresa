import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { GastosComponent } from 'src/app/components/gastos/gastos.component';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gasto-projeto',
  templateUrl: './gasto-projeto.component.html',
  styleUrls: ['./gasto-projeto.component.css']
})
export class GastoProjetoComponent {
  @Input() gastos:any =[];
  dataSource = new MatTableDataSource()
   @Input() id!:string
  displayedColumns: string[] = ['categoria',  'empresa', 'gasto', 'quantidade', 'preco', 'total'];

  constructor(public dialog: MatDialog,
    private firebaseService:FirebaseService,
  ) {}
  ngOnInit() {
  this.dataSource.data = this.gastos
  }

  // Função para abrir o diálogo de adicionar novo gasto
  openAddExpenseDialog(): void {
    const dialogRef = this.dialog.open(GastosComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebaseService.addGastoToEmpresa(result,this.id)
        // Adiciona o novo gasto à tabela
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }
}
