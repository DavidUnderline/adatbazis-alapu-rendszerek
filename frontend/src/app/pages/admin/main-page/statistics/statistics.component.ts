import { Component } from '@angular/core';
import { TopCompComponent } from "./top-comp/top-comp.component";
import { MegyeCountJobsComponent } from "./megye-count-jobs/megye-count-jobs.component";
import { MegyeAvgFizuComponent } from "./megye-avg-fizu/megye-avg-fizu.component";
import { PopularCategoriesComponent } from "./popular-categories/popular-categories.component";

@Component({
  selector: 'app-statistics',
  imports: [TopCompComponent, MegyeCountJobsComponent, MegyeAvgFizuComponent, PopularCategoriesComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {

}
