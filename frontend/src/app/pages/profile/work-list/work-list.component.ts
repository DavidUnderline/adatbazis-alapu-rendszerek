import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Allas } from '../../../shared/Model/Allas';
import { MatIcon } from '@angular/material/icon';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JobsService } from '../../../services/jobs.service';
import { LutLocationsPipe } from '../../../pipes/lut-locations.pipe';
import { DisplayDirective } from '../../../shared/directives/display.directive';

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
    console.log('job_service:', this.job_service.getjobs());
    this.job_service.getjobs().map((work: any) => {
      console.table(work);
      let temp_allas: Allas & {id: number} = {
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
        id: work.ID
      };
      this.allasok.push(temp_allas);
    });
  }

  open_applicants(job_id: number){
    this.show_applicant.emit({
      show: true,
      job_id: job_id
    });
  }
}
