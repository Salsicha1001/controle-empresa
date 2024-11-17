import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryCostEnum } from 'src/app/interfaces/categoria.interface';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { IGain } from 'src/app/interfaces/gain.interface';
import { EmpresaService } from 'src/app/shared/service/empresa.service';
import { SpinnerService } from '../load/load.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent implements OnInit {
  formCost!: FormGroup;
  readonly dialogRef = inject(MatDialogRef<GastosComponent>);
  periodLabel: any;
  listCategory: { name: CategoryCostEnum; value: CategoryCostEnum }[] = [];

  private _snackBar = inject(MatSnackBar);
  constructor(
    private _fb: FormBuilder,
    private firebaseService: FirebaseService,
    private empresaService: EmpresaService,
    private load: SpinnerService
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.createListCategory();
    this.formCost.get('preco')?.valueChanges.subscribe((value) => {
      this.formCost
        .get('preco')
        ?.setValue(this.formatarPreco(value), { emitEvent: false });
    });
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
  createForm() {
    this.formCost = this._fb.group({
      compra: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      dataCompra: new FormControl('', Validators.required),
      quantidade: new FormControl('', [Validators.required, Validators.min(1)]),
      preco: new FormControl('', [Validators.required, Validators.min(0.01)]),
      localCompra: new FormControl('', Validators.required),
    });
  }
  saveCost() {
    this.load.show();
    let formBody = this.formCost.getRawValue();
    let body: IGain = {
      categoria: formBody.categoria,
      date: formBody.dataCompra,
      empresa: this.empresaService.getSelectedValue(),
      gasto: {
        qtd: formBody.quantidade,
        name: formBody.compra,
        price: formBody.preco,
      },
      total: (
        Number(formBody.quantidade) * Number(formBody.preco.replace(',', '.'))
      ).toFixed(2),
      userRegister: JSON.parse(localStorage.getItem('user') as string)
        .displayName as string,
    };
    console.log(body);
    this.firebaseService.savePost('custo', body).then((res)=>{
      console.log(res)
      body.id = res.id
      this.dialogRef.close(body);
      this.load.hide();
      this._snackBar.open('Salvo com sucesso', 'x', { duration: 3000 });
    });
  }
  createListCategory() {
    let list: { name: CategoryCostEnum; value: CategoryCostEnum }[] = [];
    let ListEnum = Object.values(CategoryCostEnum);
    ListEnum.forEach((el) => {
      list.push({ name: el, value: el });
    });
    this.listCategory = list;
  }
}
