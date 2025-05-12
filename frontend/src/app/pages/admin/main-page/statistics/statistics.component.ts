import { Component } from '@angular/core';
import { TopCompComponent } from "./top-comp/top-comp.component";
import { MegyeCountJobsComponent } from "./megye-count-jobs/megye-count-jobs.component";

@Component({
  selector: 'app-statistics',
  imports: [TopCompComponent, MegyeCountJobsComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {

}
