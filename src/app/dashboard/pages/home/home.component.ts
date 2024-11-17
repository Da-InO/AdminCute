import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexPlotOptions, ApexFill, ApexStroke, ApexLegend, ApexTooltip } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
  colors: string[];
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  legend: ApexLegend;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  @ViewChild('barChart') barChart: ChartComponent | undefined;

  // Gráfico de donut
  public chartOptions: ChartOptions = {
    series: [3124213, 1523100, 948213],
    colors: ['#FF004F', '#FCD199', '#DAE7FF'],
    chart: {
      type: 'donut'
    },
    labels: ['Línea Familiar', 'Línea Terror', 'Línea Fantasía'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  // Gráfico de barras para usuarios online y offline
  public barChartOptions: BarChartOptions;

  constructor() {
    const onlineUsers = 179;
    const offlineUsers = 394;
    const totalUsers = onlineUsers + offlineUsers;
    const onlinePercentage = (onlineUsers / totalUsers) * 100;
    const offlinePercentage = (offlineUsers / totalUsers) * 100;

    this.barChartOptions = {
      series: [
        {
          name: 'Online',
          data: [onlinePercentage]  // Porcentaje de usuarios online
        },
        {
          name: 'Offline',
          data: [offlinePercentage]  // Porcentaje de usuarios offline
        }
      ],
      chart: {
        type: 'bar',
        height: 200,  // Ajuste la altura del gráfico
        stacked: true,
        stackType: '100%' // Establecer el gráfico como apilado
      },
      plotOptions: {
        bar: {
          horizontal: true // Establecer las barras en horizontal
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: ['Usuarios']
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val.toFixed(2) + '%';  // Mostrar porcentaje en el tooltip
          }
        }
      },
      fill: {
        opacity: 1,
        colors: ['#FF004F', '#FFDFB6']  // Colores para las barras de online y offline
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    };
  }

  ngAfterViewInit() {
    if (!this.chart) {
      console.error("El componente del gráfico donut no está disponible.");
    }
    if (!this.barChart) {
      console.error("El componente del gráfico de barras no está disponible.");
    }
  }

  getUsername(): string {
    const userData = JSON.parse(localStorage.getItem('user_authenticated') || '{}');
    return userData.name || 'Invitado';
  }

  getProfileImage(): string {
    return 'assets/Perfil.jpg';  // Aquí puedes poner la ruta de la imagen de perfil
  }
}
