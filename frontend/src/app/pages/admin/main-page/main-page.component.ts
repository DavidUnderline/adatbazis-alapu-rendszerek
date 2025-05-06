import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, numberAttribute } from '@angular/core';
import { response } from 'express';
import { Allas } from '../../../shared/Model/Allas';
import { LutLocationsPipe } from "../../../pipes/lut-locations.pipe";
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { LutCompanyNamePipe } from '../../../pipes/lut-company-name.pipe';

@Component({
  selector: 'app-main-page',
  imports: [HttpClientModule, LutLocationsPipe, CommonModule, MatIcon, LutCompanyNamePipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  allasok: Allas[] = [];

  constructor(private http : HttpClient){
    http.post('http://localhost:3000/allasok/api/searchPending', {})
    .subscribe(
      (response: any) => {
        if(response.success){
          // console.log(response.jobs);
          response.jobs.map((work: any) => {
            console.table(work);
            let temp_allas : Allas = {
              cim: work[1],
              leiras: work[2],
              kovetelmenyek: work[3],
              mikor: work[4] as Date,
              ber: work[5] as number,
              terulet_id: work[7] as number,
              ceg_adoazonosito: work[8],
              kategoria_neve: "valami_kategoria",
              kulcsszo_neve: "valami_kulcsszo",
              is_accepted: false
            };
            this.allasok.push(temp_allas);
          });
        }
        return
      },
      (error) => {
        console.error(error)
      })
  }
  
}
