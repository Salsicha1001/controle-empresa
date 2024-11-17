import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/components/load/load.service';
import { AddProjetoComponent } from 'src/app/salsicha/add-projeto/add-projeto.component';
import { EmpresaService } from 'src/app/shared/service/empresa.service';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-salsicha-home',
  templateUrl: './salsicha-home.component.html',
  styleUrls: ['./salsicha-home.component.css']
})
export class SalsichaHomeComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'descricao', 'action'];
constructor(
  private empresaService: EmpresaService,
  private dialog: MatDialog,
  private fireService: FirebaseService,
  private load: SpinnerService,
  private router:Router
){
}
  ngOnInit(): void {
    this.getData()
  }
  openDetalhesDialog(data:any){
    this.router.navigateByUrl('/salsicha3d/details',{state:{detail:data}})
  }

  dataSource = new MatTableDataSource<any>();  
  getData(){
    this.load.show()
    this.fireService.getProjetos().subscribe((res)=>{
  this.dataSource = new MatTableDataSource(res);
      this.load.hide()
      console.log(res)
    })
  }

openOptions(data:any){
  switch(data){
    case 1:{
      const add = this.dialog.open(AddProjetoComponent)
    }
  }
}
applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
}
}
