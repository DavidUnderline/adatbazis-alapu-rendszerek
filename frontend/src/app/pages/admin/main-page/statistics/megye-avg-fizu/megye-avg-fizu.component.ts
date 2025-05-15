import { Component, inject, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts';
import { StatisticsService } from '../../../../../services/statistics.service';
@Component({
  selector: 'app-megye-avg-fizu',
  imports: [HighchartsChartModule],
  templateUrl: './megye-avg-fizu.component.html',
  styleUrl: './megye-avg-fizu.component.css',
})
export class MegyeAvgFizuComponent implements OnInit {
  datas: { type: 'column'; name: 'Fizetés'; data: number[] }[] = [];
  categories: string[] = [];
  statistic_service = inject(StatisticsService);

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Átlag kereset megyénként',
    },
    xAxis: {
      categories: this.categories,
      crosshair: true,
      accessibility: {
        description: 'Megyék',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Átlagos havi bér.',
      },
    },
    tooltip: {
      valueSuffix: ' Ft',
    },
    plotOptions: {
      column: {
        pointPadding: 0.0,
        borderWidth: 0,
      },
    },
    series: this.datas,
  };

  ngOnInit(): void {
    this.statistic_service.getAvgFizu().then(
      (res) => {
        res.megyek.forEach(megye => {
          this.categories.push(megye);
        });
        let temp: number[] = [];
        res.atlag_berek.forEach(ber => {
          temp.push(ber)
        });
        this.datas.push({
          type: 'column',
          name: 'Fizetés',
          data: temp
        });
        console.log(JSON.stringify(this.categories));
        console.log(this.datas)
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
