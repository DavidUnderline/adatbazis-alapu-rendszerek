import { Component, inject, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts';
import { StatisticsService } from '../../../../../services/statistics.service';

@Component({
  selector: 'app-top-comp',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './top-comp.component.html',
  styleUrl: './top-comp.component.css',
})
export class TopCompComponent implements OnInit {
  datas: {type: 'column', name: 'Jelentkezők', data: number[]}[] = [];
  categories: string[] = [];
  statistic_service = inject(StatisticsService);
  title = '';
  
  Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options = {
      chart: {
        type: 'column'
    },
    title: {
        text: "Közkedvelt cégek"
    },
    xAxis: {
        categories: this.categories,
        crosshair: true,
        accessibility: {
            description: 'Cégek'
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
}
    

  ngOnInit(): void {
    this.statistic_service.getTopCeg().then(
      (res: any) => {
        console.log("res",res);
        let temp = []
        for (let i = 0; i < res.cegek.length; i++) {
          const category = res.cegek[i];
          temp.push( res.jelentkezok_szama[i]);
          this.categories.push(category);
        }
        this.datas.push({
          type: "column",
          name: "Jelentkezők",
          data: temp
        });
        console.log("datas\n", JSON.stringify(this.datas))
        console.log("datas\n", JSON.stringify(this.categories))
        this.title += "Top " + this.datas.length + " cég jelentkezések alapján"
      },
      (err) => {
        console.error(err)
      }
    )
    
  }
}
