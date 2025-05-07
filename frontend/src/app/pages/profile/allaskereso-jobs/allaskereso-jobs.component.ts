import { Component, EventEmitter, inject, Output } from '@angular/core';
import { JobsService } from '../../../services/jobs.service';
import { MatIcon } from '@angular/material/icon';
import { LutLocationsPipe } from "../../../pipes/lut-locations.pipe";
import { CommonModule } from '@angular/common';
import { LutCompanyNamePipe } from '../../../pipes/lut-company-name.pipe';
import { Allas } from '../../../shared/Model/Allas';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-allaskereso-jobs',
  imports: [MatIcon, LutLocationsPipe, CommonModule, LutCompanyNamePipe, HttpClientModule],
  templateUrl: './allaskereso-jobs.component.html',
  styleUrl: './allaskereso-jobs.component.css'
})
export class AllaskeresoJobsComponent {
  private job_service = inject(JobsService);
  jobs: (Allas & {id: number})[] = [];
  current_email = localStorage.getItem("username");
  @Output() msg = new EventEmitter<{
    success: boolean,
    message: string
  }>();

  constructor(private http: HttpClient){
    this.load()
  }
  
  load(){
    this.jobs = [];
    // this.job_service.clearjobs()
    this.job_service.getjobs().map((work: any ) => {
        
      console.table(work);
      this.jobs.push({
        id: work.ID,
        cim: work.CIM,
        leiras: work.LEIRAS,
        kovetelmenyek: work.KOVETELMENYEK,
        mikor: work.MIKOR,
        ber: work.BER,
        is_accepted: work.IS_ACCEPTED,
        terulet_id: work.TERULET_ID,
        ceg_adoazonosito: work.CEG_ADOAZONOSITO,
        kulcsszo_neve: work.KULCSSZO_NEVE,
        kategoria_neve: work.KATEGORIA_NEVE
      });
    });
  }

  unsubscribe(job_id: number){
    this.http.post('http://localhost:3000/allaskereso/api/unsubscribeJob', {email: this.current_email, job_id: job_id})
    .subscribe(
      (response: any) => {
        this.msg.emit({
          success: response.success,
          message: response.message
        })
        if(response.success){
          this.load();
        }
      },
      (error) => {
        this.msg.emit({
          success: false,
          message: error.message
        })
      }
    )
  }

}
