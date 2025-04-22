import { Component, inject } from '@angular/core';
import { SearchFormComponent } from './search-form/search-form.component';
import { Allas } from '../../shared/Model/Allas';
import jobs from '../../shared/dummy_data/jobs.json';
import { WorkService } from '../../services/work.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [SearchFormComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private work_offers: Allas[] = [];
  filtered_work_offers: Allas[] = [];
  is_searched = false;
  private work_service = inject(WorkService);
  private router = inject(Router);

  constructor() {
    let temp = jobs;
    temp.forEach((value) => {
      this.work_offers.push(<Allas>{
        ...value,
        mikor: new Date(value.mikor),
      });
    });
  }

  filter_works(work_filter: Allas) {
    this.filtered_work_offers = [];
    this.is_searched = false;
    
    this.work_offers.forEach((work) => {
      if (
        (work.kategoria_neve === work_filter.kategoria_neve ||
        work.ceg_adoazonosito === work_filter.ceg_adoazonosito) &&
          work.terulet_id === work_filter.terulet_id
      ) {
        this.filtered_work_offers.push(work);
      }
    });
    
    this.is_searched = this.filtered_work_offers.length > 0 || !this.is_searched;
  }

  navigate(work: Allas){
    this.work_service.setWork(work);
    this.router.navigateByUrl("/work-details");
  }
}
