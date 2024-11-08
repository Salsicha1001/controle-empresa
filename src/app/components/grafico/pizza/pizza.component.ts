import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent {
  @Input() vendas!: Array<any>;  // O seu array de vendas com dataVenda, modoPagamento, etc.

  graficoPie: any;
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
          position: 'top', 
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            // Formata o valor para mostrar como R$
            return 'R$ ' + tooltipItem.raw.toFixed(2);
          }
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vendas']) {
      this.formatarDadosGrafico(); // Chama a formatação de dados sempre que houver mudança
    }
  }

  formatarDadosGrafico() {
    // Criação de um objeto para acumular os valores totais por tipo de pagamento
    const pagamentosTotais: { [key: string]: number } = {};

    // Itera sobre os dados de vendas
    this.vendas.forEach(venda => {
      const modoPagamento = venda.modoPagamento;
      const total = parseFloat(venda.total);  // Converte para número

      // Soma o total ao valor correspondente ao modo de pagamento
      if (pagamentosTotais[modoPagamento]) {
        pagamentosTotais[modoPagamento] += total;
      } else {
        pagamentosTotais[modoPagamento] = total;
      }
    });

    // Prepara os dados para o gráfico de pizza (labels e dados)
    const labels = Object.keys(pagamentosTotais);
    const data = Object.values(pagamentosTotais);

    // Criação do gráfico de Pizza
    this.graficoPie = {
      labels: labels,  // Modos de pagamento
      datasets: [
        {
          data: data,  // Totais por modo de pagamento
          backgroundColor: ['#FFB6C1', '#8A2BE2', '#7FFF00', '#FF6347'],  // Cores do gráfico
        }
      ]
    };
}
}
