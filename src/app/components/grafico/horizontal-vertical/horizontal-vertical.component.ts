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
    if (changes['gastos'] || changes['lucro']) this.formatarDadosGrafico(); // Chama a formatação de dados sempre que houver mudanç
  }
  isLoad = false;
  // Formatar dados de Vendas e Gasto
  formatarDadosGrafico() {
    this.isLoad = false;
    // Formatar os dados de Vendas
    const vendasPorMes: { [key: string]: number } = {};
    this.lucro.forEach((venda) => {
      let timestamp: any = '';
      if (venda.dataVenda) {
        if (venda.dataVenda?.seconds) {
          timestamp = venda.dataVenda?.seconds * 1000; // Convertendo para milissegundos
        } else {
          timestamp = venda.dataVenda;
        }
        const data = new Date(timestamp);
        const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`; // Formato "MM/YYYY"

        // Acumulando o total das vendas por mês/ano
        const total = parseFloat(venda?.total ? venda.total : '0'); // Convertendo para número
        vendasPorMes[mesAno] = vendasPorMes[mesAno]
          ? vendasPorMes[mesAno] + total
          : total;
      }
    });

    // Formatar os dados de Gastos
    const gastosPorMes: { [key: string]: number } = {};
    this.gastos.forEach((categoria) => {
      let timestamp: any = '';
      if (categoria.date) {
        if (categoria.date?.seconds) {
          timestamp = categoria.date?.seconds * 1000; // Convertendo para milissegundos
        } else {
          timestamp = categoria.date;
        }
      } // Convertendo para milissegundos
      const data = new Date(timestamp);
      const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`; // Formato "MM/YYYY"
      const total = parseFloat(categoria.total);

      gastosPorMes[mesAno] = gastosPorMes[mesAno]
        ? gastosPorMes[mesAno] + total
        : total;
      console.log(gastosPorMes);
    });
    const allMonths = [
      ...new Set([...Object.keys(gastosPorMes), ...Object.keys(vendasPorMes)]),
    ];

    allMonths.sort((a, b) => {
      const [monthA, yearA] = a.split('/').map(Number); // Converte mês e ano para números
      const [monthB, yearB] = b.split('/').map(Number);

      // Cria objetos Date com ano e mês
      const dateA = new Date(yearA, monthA - 1); // Subtrai 1 do mês porque Date usa 0-indexed (jan = 0)
      const dateB = new Date(yearB, monthB - 1);

      return dateA.getTime() - dateB.getTime();
    });

    const vendasData = allMonths.map((month) => vendasPorMes[month] || 0); // Preenche com 0 se não tiver dado
    const gastosData = allMonths.map((month) => gastosPorMes[month] || 0); // Preenche com 0 se não tiver dado

    // Preencher os dados do gráfico de vendas
    this.graficoVe.labels = allMonths.sort((a, b) => {
      const [mesA, anoA] = a.split('/').map(Number); // Separa mês e ano e converte para número
      const [mesB, anoB] = b.split('/').map(Number); // Separa mês e ano e converte para número

      // Compara ano primeiro, e depois o mês, caso os anos sejam iguais
      if (anoA !== anoB) {
        return anoA - anoB;
      } else {
        return mesA - mesB;
      }
    });
    debugger;
    this.graficoVe.datasets[0].data = vendasData;

    this.graficoVe.datasets[1].data = gastosData;
    this._cd.detectChanges();
    setTimeout(() => {
      this.isLoad = true;
    }, 200);
    console.log(this.graficoVe);
  }
  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue(
    '--text-color-secondary'
  );
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
  options = {
    maintainAspectRatio: false,
    aspectRatio: 1.2,
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
