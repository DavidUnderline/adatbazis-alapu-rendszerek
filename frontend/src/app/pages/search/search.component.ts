import { Component, inject } from '@angular/core';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchFilterDialogComponent } from './search-filter-dialog/search-filter-dialog.component';
import { Allas } from '../../shared/Model/Allas';
import { WorkService } from '../../services/work.service';
import { Router } from '@angular/router';
import { DisplayDirective } from '../../shared/directives/display.directive';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-search',
  imports: [
    SearchFormComponent,
    SearchFilterDialogComponent,
    DisplayDirective,
    HttpClientModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
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
    this.is_searched = true;
    this.filtered_work_offers = [];
    
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
          if (response.error === undefined) {
            console.table(response);
            response.forEach((work: any) => {
                this.filtered_work_offers.push({
                  cim: work.CIM as string,
                  leiras: work.LEIRAS as string,
                  kovetelmenyek: work.KOVETELMENYEK as string,
                  ber: work.BER as number,
                  mikor: work.MIKOR as Date,
                  ceg_adoazonosito: work.CEG_ADOAZONOSITO as string,
                  is_accepted: work.IS_ACCEPTED as boolean,
                  terulet_id: work.TERULET_ID as number,
                  kategoria_neve: '',
                  kulcsszo_neve: ''
                });
              });
          } else {
            console.log("[ERROR]:\n");
            
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
