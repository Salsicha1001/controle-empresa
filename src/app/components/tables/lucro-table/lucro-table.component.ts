import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendasComponent } from '../../vendas/vendas.component';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-lucro-table',
  templateUrl: './lucro-table.component.html',
  styleUrls: ['./lucro-table.component.css'],
})
export class LucroTableComponent {
  constructor(
    private dialog: MatDialog,
    private firestoreService:FirebaseService
  ){}
  displayedColumns: string[] = [
    'dataVenda',
    'modoPagamento',
    'venda',
    'quantidade',
    'preco',
    'total',
    'actions',
  ];

  // Dados de exemplo
  @Input() dataVendas:any=[]

ngOnChanges(changes: SimpleChanges): void {
if(changes['dataVendas']){
  this.dataVendas.map((el:any)=>el.dataVenda = new Date(el.dataVenda.seconds *1000))
}
  
}
openEdit(data:any){
  const dialogRef = this.dialog.open(VendasComponent,{
    data:data
  });
}
deleteRow(data:any){
  this.firestoreService
  .deleteDocument('vendas', data?.id)
  .then(() => {
    console.log('Documento deletado!');
  })
  .catch((error) => {
    console.error('Erro ao deletar documento:', error);
  });
}
getTotalCost(){
  return this.dataVendas?.map((t:any) => Number(t.total)).reduce((acc: number, value: number) => acc + value, 0);
}
getQtyTotal(){
  return this.dataVendas?.map((t:any) => Number(t.venda.quantidade)).reduce((acc: number, value: number) => acc + value, 0);

}
}
