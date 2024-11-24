import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { HomeService } from 'src/app/services/home.service';
import { 
  ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexAxisChartSeries, ApexXAxis, 
  ApexPlotOptions, ApexFill, ApexStroke, ApexLegend, ApexTooltip, ApexDataLabels, ApexYAxis, ApexTitleSubtitle
} from 'ng-apexcharts';

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

export type TopMoviesChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  @ViewChild('barChart') barChart: ChartComponent | undefined;
  @ViewChild('topMoviesChart') topMoviesChart: ChartComponent | undefined;

  totalSurveysCompleted: number = 0;

  // Gráfico de donut
  public chartOptions: ChartOptions = {
    series: [],
    colors: ['#FF004F', '#FCD199', '#DAE7FF'],
    chart: {
      type: 'donut',
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  // Gráfico de barras para usuarios online y offline
  public barChartOptions: BarChartOptions = {
    series: [],
    chart: { type: 'bar', height: 200, stacked: true, stackType: '100%' },
    plotOptions: { bar: { horizontal: true } },
    xaxis: { categories: [] },
    fill: { opacity: 1 },
    stroke: { width: 1, colors: ['#fff'] },
    tooltip: { y: { formatter: (val) => `${val.toFixed(2)}%` } },
    legend: { position: 'top', horizontalAlign: 'left', offsetX: 40 },
  };

  // Configuración del gráfico de Top Películas
  public topMoviesChartOptions: TopMoviesChartOptions = {
    series: [],
    chart: { type: 'bar', height: 280, width: '300%' },
    xaxis: { categories: [] },
    stroke: { width: 1, colors: ['#fff'] },
    dataLabels: {
      enabled: true,
      style: { colors: ['#fff'] },
      formatter: (val, opt) => '',
    },
    plotOptions: {
      bar: {
        barHeight: '80%',
        distributed: true,
        horizontal: true,
        dataLabels: { position: 'bottom' },
      },
    },
    yaxis: { labels: { show: false } },
    tooltip: {
      theme: 'dark',
      x: { show: false },
      y: {
        title: {
          formatter: () => '',
        },
      },
    },
    colors: ['#FF4500', '#FF004F', '#00BFFF', '#FFD700', '#6A5ACD'],
    title: { text: 'Top Películas', align: 'center', floating: true },
    subtitle: { text: 'Puntuaciones de las mejores películas', align: 'center' },
  };

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadDashboardMetrics();
  }

  ngAfterViewInit(): void {
    if (!this.chart) {
      console.error('El componente del gráfico donut no está disponible.');
    }
    if (!this.barChart) {
      console.error('El componente del gráfico de barras no está disponible.');
    }
    if (!this.topMoviesChart) {
      console.error('El componente del gráfico de Top Películas no está disponible.');
    }
  }

  private loadDashboardMetrics(): void {
    this.homeService.getDashboardMetrics().subscribe((data: any) => {
      // Total de encuestas completadas
      this.totalSurveysCompleted = data.totalSurveysCompleted;

      // Datos para el gráfico de donut
      this.chartOptions.series = data.popularCategories.map((category: any) => category.value);
      this.chartOptions.labels = data.popularCategories.map((category: any) => category.name);

      // Datos para el gráfico de barras
      const onlineUsers = data.onlineUsers || 0;
      const offlineUsers = data.offlineUsers || 0;
      const totalUsers = onlineUsers + offlineUsers;

      this.barChartOptions.series = [
        { name: 'Online', data: [(onlineUsers / totalUsers) * 100] },
        { name: 'Offline', data: [(offlineUsers / totalUsers) * 100] },
      ];
      this.barChartOptions.xaxis.categories = ['Usuarios'];

      // Datos para el gráfico de películas
      this.topMoviesChartOptions.series = [{ data: data.topMovies.map((movie: any) => movie.rating) }];
      this.topMoviesChartOptions.xaxis.categories = data.topMovies.map((movie: any) => movie.title);
      this.topMoviesChartOptions.dataLabels.formatter = (val, opt) =>
        `${data.topMovies[opt.dataPointIndex].title}: ${val}/10`;
    });
  }
}
