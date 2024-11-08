import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService } from 'src/app/shared/service/empresa.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GastosComponent } from 'src/app/components/gastos/gastos.component';
import { VendasComponent } from 'src/app/components/vendas/vendas.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { SpinnerService } from 'src/app/components/load/load.service';
import { IGain } from 'src/app/interfaces/gain.interface';
import { VendasInterface } from 'src/app/interfaces/vendas.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  empresaSelect!: any;
  campaignOne = new FormGroup({
    start: new FormControl(this.getThirtyDaysAgo(), Validators.required),
    end: new FormControl(new Date(), Validators.required),
  });
  gastos!: Array<IGain>;
  lucro!: Array<VendasInterface>;
  constructor(
    private empresaService: EmpresaService,
    private dialog: MatDialog,
    private fireService: FirebaseService,
    private load: SpinnerService
  ) {}
  ngOnInit() {
    this.empresaService.selectedValue$.subscribe((res) => {
      this.empresaSelect = res;
    });
  }

  getThirtyDaysAgo(): Date {
    const today = new Date();
    today.setDate(today.getDate() - 30); // Subtrai 30 dias
    return today;
  }

  optionClicked(option: number) {
    switch (option) {
      case 1: {
        const dialogRef = this.dialog.open(GastosComponent);
        break;
      }
      case 2: {
        const dialogRef = this.dialog.open(VendasComponent);
        break;
      }
    }
  }
  search() {
    this.gastos = [];
    this.lucro = [];
    this.load.show();
    if (this.campaignOne.valid && this.empresaSelect) {
      this.fireService
        .getDataWithDateFilterVenda(
          this.campaignOne.get('start')?.value as unknown as Date,
          this.campaignOne.get('end')?.value as Date
        )
        .subscribe((res) => {
          this.lucro = res.filter((el) => el.empresa == this.empresaSelect);
          this.fireService
            .getDataWithDateFilterGastos(
              this.campaignOne.get('start')?.value as unknown as Date,
              this.campaignOne.get('end')?.value as Date
            )
            .subscribe((result) => {
              this.gastos = result.filter(
                (el) => el.empresa == this.empresaSelect
              );
              console.log(this.gastos, this.lucro);
              this.load.hide();
            });
        });
    }
  }
}
