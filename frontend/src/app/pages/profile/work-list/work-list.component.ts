import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Allas } from '../../../shared/Model/Allas';
import { MatIcon } from '@angular/material/icon';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JobsService } from '../../../services/jobs.service';
import { LutLocationsPipe } from '../../../pipes/lut-locations.pipe';
import { DisplayDirective } from '../../../shared/directives/display.directive';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { response } from 'express';

@Component({
  selector: 'app-work-list',
  imports: [MatIcon, LutLocationsPipe, CommonModule, DisplayDirective],
  templateUrl: './work-list.component.html',
  styleUrl: './work-list.component.css',
})
export class WorkListComponent {
  job_service = inject(JobsService);
  allasok: (Allas & {id: number})[] = [];

  @Output() show_applicant = new EventEmitter<{
    show: boolean,
    job_id: number
  }>();

  
  constructor() {
    // console.table(localStorage);
    this.load()
  }

  private load(){
    const data = {
      tipo: "ceg",
      adoazonosito: localStorage.getItem('adoazonosito')
    }
    // console.log(data);
    // return;

    this.job_service.getjobs(data).pipe(
      map((response: any) => {
        // any[] = []
        const allasArray: (Allas & { id: number })[] = [];

        if (response && response.jobs) {
          response.jobs.forEach((work: any) => {
            allasArray.push({
              id: work.ID,
              cim: work.CIM,
              leiras: work.LEIRAS,
              kovetelmenyek: work.KOVETELMENYEK,
              mikor: work.MIKOR,
              ber: work.BER,
              is_accepted: work.IS_ACCEPTED,
              terulet_id: work.TERULET_ID,
              ceg_adoazonosito: work.ADOAZONOSITO,
              kulcsszo_neve: "string",
              kategoria_neve: "string",
            });
          });
          return allasArray;
        }

        return [];
      }), // map

      catchError(error => {
        console.error(error);
        return of([]);
      })
    ) // pipe

    .subscribe(allasok => {
      this.allasok = allasok;
      // console.log(this.allasok);
    });
  }

  delete(job_id: number){
    this.job_service.deleteJobById(job_id);
    this.load();
  }

  open_applicants(job_id: number){
    this.show_applicant.emit({
      show: true,
      job_id: job_id
    });
  }
}
