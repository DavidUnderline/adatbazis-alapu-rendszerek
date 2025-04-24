import { Component, inject } from '@angular/core';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchFilterDialogComponent } from './search-filter-dialog/search-filter-dialog.component';
import { Allas } from '../../shared/Model/Allas';
// import jobs from '../../shared/dummy_data/jobs.json';
import { WorkService } from '../../services/work.service';
import { Router } from '@angular/router';
import { DisplayDirective } from '../../shared/directives/display.directive';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';


@Component({
  selector: 'app-search',
  imports: [
    SearchFormComponent,
    SearchFilterDialogComponent,
    DisplayDirective,
    HttpClientModule,
    ErrorMsgComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private work_offers: Allas[] = [];
  filtered_work_offers: Allas[] = [];
  is_searched = false;
  addittional_filter!: {kovetelmeny: string, min: number, max: number}
  private work_service = inject(WorkService);
  private router = inject(Router);
  show: boolean = false;

  constructor(private http: HttpClient){}

  filter_works(work_filter: Allas) {
    // console.table(work_filter);
    // console.table(this.addittional_filter);
    let data = {};
    
    if(this.addittional_filter != undefined){
      data = {
        company: work_filter.kategoria_neve,
        location: work_filter.terulet_id,
        requirement: this.addittional_filter.kovetelmeny,
        salarymax: this.addittional_filter.max,
        salarymin: this.addittional_filter.min
      }
    
    } else{
      data = {
        company: work_filter.kategoria_neve,
        location: work_filter.terulet_id
      }
    }

    this.http.post<any>('http://localhost:3000/allasok/api/searchjob', data).subscribe(
      response => {
          if (response.success) {
            console.table(response);
            this.filtered_work_offers = response.allasok;
          } else {
            console.table(response);
          }
        },
        (error) => {
          console.table(error);
        }
      );

  }

  navigate(work: Allas){
    this.work_service.setWork(work);
    this.router.navigateByUrl("/work-details");
  }

  showDialog(){
    this.show = !this.show;
  }



}
