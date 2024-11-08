import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpresaService } from 'src/app/shared/service/empresa.service';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { SpinnerService } from '../load/load.service';
import { IGain } from 'src/app/interfaces/gain.interface';
import { ModoPagamento, VendasInterface } from 'src/app/interfaces/vendas.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css'],
})
export class VendasComponent implements OnInit {
  form!: FormGroup;
  readonly dialogRef = inject(MatDialogRef<VendasComponent>);
  periodLabel: any;
  private _snackBar = inject(MatSnackBar);
  listPay: { name: ModoPagamento; value: ModoPagamento }[] = [];

  constructor(
    private _fb: FormBuilder,
    private firebaseService: FirebaseService,
    private empresaService: EmpresaService,
    private load: SpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: VendasInterface,
  ) {}
  ngOnInit(): void {
    this.createListCategory()
    this.createForm()
    this.form.get('preco')?.valueChanges.subscribe((value) => {
      this.form
        .get('preco')
        ?.setValue(this.formatarPreco(value), { emitEvent: false });
    });
  }

  createForm() {
    if(this.data){
      this.form = this._fb.group({
        venda: new FormControl(this.data.venda.venda, Validators.required),
        dataVenda: new FormControl(this.data.dataVenda, Validators.required),
        quantidade: new FormControl(this.data.venda.quantidade, Validators.required),
        preco: new FormControl(this.data.venda.preco, Validators.required),
        modoPagamento: new FormControl(this.data.modoPagamento, Validators.required),     
      });
    }else{
      this.form = this._fb.group({
        venda: new FormControl('', Validators.required),
        dataVenda: new FormControl(new Date(), Validators.required),
        quantidade: new FormControl('', Validators.required),
        preco: new FormControl('', Validators.required),
        modoPagamento: new FormControl('', Validators.required),     
      });
    }
  }
  createListCategory() {
    let list: { name: ModoPagamento; value: ModoPagamento }[] = [];
    let ListEnum = Object.values(ModoPagamento);
    ListEnum.forEach((el) => {
      list.push({ name: el, value: el });
    });
    this.listPay = list;
  }
  formatarPreco(value: string): string {
    // Remove caracteres não numéricos
    value = value.replace(/\D/g, '');
    // Formata o valor como preço
    if (value) {
      return (parseFloat(value) / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      });
    }
    return '';
  }

  save() {
    this.load.show();
    let formBody = this.form.getRawValue();
    let body: VendasInterface = {
      dataVenda: formBody.dataVenda,
      empresa: this.empresaService.getSelectedValue(),
      venda: {
        quantidade: formBody.quantidade,
        venda: formBody.venda,
        preco: formBody.preco,
      },
      modoPagamento:formBody.modoPagamento,
      total: (
        Number(formBody.quantidade) * Number(formBody.preco.replace(',', '.'))
      ).toFixed(2),
      userRegister: JSON.parse(localStorage.getItem('user') as string)
        .displayName as string,
    };
    console.log(body);
    if(this.data?.id){
this.firebaseService.editDocument('vendas',this.data.id, body)
    }else{ 
      this.firebaseService.savePost('vendas', body);
    }
    this.load.hide();
    this._snackBar.open('Salvo com sucesso', 'x', { duration: 3000 });
    this.dialogRef.close();
  }
}
