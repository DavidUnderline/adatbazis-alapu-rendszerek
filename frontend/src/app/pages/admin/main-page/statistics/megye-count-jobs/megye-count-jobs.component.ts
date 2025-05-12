import { Component, inject, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts';
import { StatisticsService } from '../../../../../services/statistics.service';

@Component({
  selector: 'app-megye-count-jobs',
  imports: [HighchartsChartModule],
  templateUrl: './megye-count-jobs.component.html',
  styleUrl: './megye-count-jobs.component.css'
})
export class MegyeCountJobsComponent implements OnInit {
  datas: { name: string; y: number }[] = [];

  statistic_service = inject(StatisticsService);

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: undefined,
      plotBorderWidth: undefined,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Megyénkénti álláslehetőségek száma.',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{y}</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Állások száma',
        data: this.datas
      },
    ],
  };

  ngOnInit(): void {
    this.statistic_service
      .getAllasCountByMegye()
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.megyek.length; i++) {
          const megye = res.megyek[i];
          const allasok_db = res.allasok_megyenkent[i]
          this.datas.push({
            name : megye,
            y: allasok_db
          });
        }
        console.table(this.datas);
        })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}
