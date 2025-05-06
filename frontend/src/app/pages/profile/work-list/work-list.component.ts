import { Component, inject, Input } from '@angular/core';
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
  allasok: Allas[] = [];
  constructor() {
    console.log('job_service:', this.job_service.getjobs());
    this.job_service.getjobs().map((work: any) => {
      let temp_allas: Allas = {
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
      };
      this.allasok.push(temp_allas);
    });
  }
}
