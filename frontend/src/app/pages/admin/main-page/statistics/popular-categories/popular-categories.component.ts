import { Component, inject, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts';
import { StatisticsService } from '../../../../../services/statistics.service';

@Component({
  selector: 'app-popular-categories',
  imports: [HighchartsChartModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent implements OnInit{
datas: {type: 'column', name: 'Jelentkezők', data: number[]}[] = [];
  categories: string[] = [];
  statistic_service = inject(StatisticsService);
  
  Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options = {
      chart: {
        type: 'column'
    },
    title: {
        text: "Közkedvelt kategóriák"
    },
    xAxis: {
        categories: this.categories,
        crosshair: true,
        accessibility: {
            description: 'kategóriák'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Állásjelentkezőik száma.'
        }
    },
    tooltip: {
        valueSuffix: ' db'
    },
    plotOptions: {
        column: {
            pointPadding: 0.0,
            borderWidth: 0
        }
    },
    series: this.datas
};

  ngOnInit(): void {
      this.statistic_service.getPopularCategories().then(
        (res: {kategoriak: string[], job_db : number[]}) => {
          res.kategoriak.forEach((k) => {
            this.categories.push(k);
          })
          let temp : number[] = []
          res.job_db.forEach(j => {
            temp.push(j)
          })
          this.datas.push({
            type: 'column',
            name: 'Jelentkezők',
            data: temp
          });
        },
        (err) => { console.error(err)}
      );
  }

}
