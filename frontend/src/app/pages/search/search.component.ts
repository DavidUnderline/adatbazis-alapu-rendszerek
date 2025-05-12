import { Component } from '@angular/core';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchFilterDialogComponent } from './search-filter-dialog/search-filter-dialog.component';
import { DisplayDirective } from '../../shared/directives/display.directive';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { WorkMiniComponent } from './work-mini/work-mini.component';
import { response } from 'express';

@Component({
  selector: 'app-search',
  imports: [
    SearchFormComponent,
    SearchFilterDialogComponent,
    DisplayDirective,
    HttpClientModule,
    CommonModule,
    WorkMiniComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  filtered_work_offers: any = [];
  is_searched = false;
  addittional_filter!: { company: string | null; min: number; max: number };

  show: boolean = false;
  show_rate_dialog = false;

  constructor(private http: HttpClient) {}

  filter_works(work_filter: any) {
    console.table(work_filter);
    // console.table(this.addittional_filter);
    // return;
    
    let data: any = {
      category: work_filter.category,
      keyword: work_filter.keyword,
      location: work_filter.city,
    };
    this.is_searched = true;
    this.filtered_work_offers = [];
    // console.table(this.addittional_filter);
    
    if(this.addittional_filter != undefined){
      data.company = this.addittional_filter.company,
      data.salarymax = this.addittional_filter.max,
      data.salarymin = this.addittional_filter.min
    } 

    if(!data.location && !data.keyword && !data.company && !data.category){
      return;
    }

    this.http
      .post<any>('http://localhost:3000/allasok/api/searchjob', data)
      .subscribe(
        (response) => {
          if (response.success) {
            // console.log(Object.keys(response.allasok).length);
            response.allasok.forEach((work: any) => {
              console.table(work)
              this.filtered_work_offers.push({
                id: work.ID as number,
                cim: work.CIM as string,
                leiras: work.LEIRAS as string,
                kovetelmenyek: work.KOVETELMENYEK as string,
                ber: work.BER as number,
                mikor: work.MIKOR as Date,
                ceg_adoazonosito: work.CEG_ADOAZONOSITO as string,
                terulet_id: work.TERULET_ID as number,
                kategoria_neve: work.KATEGORIA_NEVE	,
                kulcsszo_neve: work.key_words,
              });
            });   
          } else {
            console.log(response.error);
          }
        },
        (error) => {
          console.table(error);
        }
      );
  }

  showDialog() {
    this.show = !this.show;
  }
}
