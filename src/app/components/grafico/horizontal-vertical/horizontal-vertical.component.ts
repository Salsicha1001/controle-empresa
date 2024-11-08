import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGain } from 'src/app/interfaces/gain.interface';
import { VendasInterface } from 'src/app/interfaces/vendas.interface';

@Component({
  selector: 'app-horizontal-vertical',
  templateUrl: './horizontal-vertical.component.html',
  styleUrls: ['./horizontal-vertical.component.css'],
})
export class HorizontalVerticalComponent implements OnChanges {
  @Input() gastos: Array<IGain> = [];
  @Input() lucro: Array<VendasInterface> = [];
  constructor(private _cd: ChangeDetectorRef) {}
  // Dados formatados para o gráfico
  graficoVe: any = {
    labels: [] as Array<string>, // Meses e anos
    datasets: [
      {
        label: 'Total de Vendas (R$)',
        data: [], // Totais de cada mês
      },
      {
        label: 'Total de Gasto (R$)',
        data: [], // Totais de cada mês
      },
    ],
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gastos']|| changes['lucro']) 
      this.formatarDadosGrafico(); // Chama a formatação de dados sempre que houver mudanç
  }
  isLoad = false;
  // Formatar dados de Vendas e Gasto
  formatarDadosGrafico() {
    this.isLoad = false;
    // Formatar os dados de Vendas
    const vendasPorMes: { [key: string]: number } = {};
    this.lucro.forEach((venda) => {
      let timestamp:any='';
      if (venda.dataVenda) {
        if(venda.dataVenda?.seconds){
           timestamp= venda.dataVenda?.seconds * 1000; // Convertendo para milissegundos
        }else{
          timestamp = venda.dataVenda
        }
        const data = new Date(timestamp);
        const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`; // Formato "MM/YYYY"

        // Acumulando o total das vendas por mês/ano
        const total = parseFloat(venda.total); // Convertendo para número
        vendasPorMes[mesAno] = vendasPorMes[mesAno]
          ? vendasPorMes[mesAno] + total
          : total;
      }
    });

    // Preencher os dados do gráfico de vendas
    this.graficoVe.labels = Object.keys(vendasPorMes);
    this.graficoVe.datasets[0].data = Object.values(vendasPorMes);

    // Formatar os dados de Gastos
    const gastosPorMes: { [key: string]: number } = {};
    this.gastos.forEach((categoria) => {
      let timestamp:any='';
      if (categoria.date) {
        if(categoria.date?.seconds){
           timestamp= categoria.date?.seconds * 1000; // Convertendo para milissegundos
        }else{
          timestamp = categoria.date
        }
       } // Convertendo para milissegundos
      const data = new Date(timestamp);
      const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`; // Formato "MM/YYYY"
      const total = parseFloat(categoria.total);

      gastosPorMes[mesAno] = gastosPorMes[mesAno]
        ? gastosPorMes[mesAno] + total
        : total;
    });

    // Preencher os dados do gráfico de gastos
    const dadosGastos = Object.values(gastosPorMes);
    this.graficoVe.datasets[1].data = dadosGastos;
    this._cd.detectChanges();
    console.log(this.graficoVe);
    this.isLoad = true;
  }

  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue(
    '--text-color-secondary'
  );
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
  options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: this.textColor,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mês/Ano',
          font: {
            weight: 500,
           
            size: 14, // Aumente o tamanho da fonte do título do eixo Y
          },
        },
        ticks: {
          color: this.textColorSecondary,
          font: {
            weight: 500,
            size: 14,
          },
        },
        grid: {
          color: this.surfaceBorder,
          drawBorder: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'R$',
          font: {
            weight: 500,

            size: 14, // Aumente o tamanho da fonte do título do eixo Y
          },
        },
        ticks: {
          color: this.textColorSecondary,
        },
        grid: {
          color: this.surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };
}
