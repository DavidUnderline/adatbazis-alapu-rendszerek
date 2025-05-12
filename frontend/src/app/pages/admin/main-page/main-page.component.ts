import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, numberAttribute, OnInit } from '@angular/core';
import { response } from 'express';
import { Allas } from '../../../shared/Model/Allas';
import { LutLocationsPipe } from '../../../pipes/lut-locations.pipe';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { LutCompanyNamePipe } from '../../../pipes/lut-company-name.pipe';
import { ErrorMsgComponent } from '../../../shared/error-msg/error-msg.component';
import { SuccessMsgComponent } from '../../../shared/success-msg/success-msg.component';
import { DisplayDirective } from '../../../shared/directives/display.directive';
import { AddAdminFormComponent } from "./add-admin-form/add-admin-form.component";
import { DeleteUserFormComponent } from "./delete-user-form/delete-user-form.component";
import { StatisticsComponent } from "./statistics/statistics.component";

@Component({
  selector: 'app-main-page',
  imports: [
    HttpClientModule,
    LutLocationsPipe,
    CommonModule,
    MatIcon,
    LutCompanyNamePipe,
    ErrorMsgComponent,
    SuccessMsgComponent,
    DisplayDirective,
    AddAdminFormComponent,
    DeleteUserFormComponent,
    StatisticsComponent
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  allasok: (Allas & { id: number })[] = [];
  show_error = false;
  show_success = false;
  error_msg = '';
  success_msg = '';

  ngOnInit() {
    this.show_error = false;
    this.show_success = false;
    this.loadPendingAllasok();
  }

  constructor(private http: HttpClient) {}
  loadPendingAllasok() {
    this.allasok = [];
    this.http.post('http://localhost:3000/allasok/api/searchPending', {}).subscribe(
      (response: any) => {
        if (response.success) {
          response.jobs.map((work: any) => {
            console.table(work);
            let temp_allas: Allas & { id: number } = {
              id: work.ID,
              cim: work.CIM,
              leiras: work.LEIRAS,
              kovetelmenyek: work.KOVETELMENYEK,
              mikor: work.MIKOR,
              ber: work.BER,
              is_accepted: work.IS_ACCEPTED,
              terulet_id: work.TERULET_ID,
              ceg_adoazonosito: work.CEG_ADOAZONOSITO,
              kulcsszo_neve: work.key_words,
              kategoria_neve: work.KATEGORIA_NEVE
            };
            this.allasok.push(temp_allas);
          });
        }
        return;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteJob(id: number) {
    this.http
      .post('http://localhost:3000/allasok/api/deleteById', { id: id })
      .subscribe(
        (response: any) => {
          console.log(response.message);
          if (response.success) {
            
            this.loadPendingAllasok();

            this.successHandler(response.message);
          } else {
            this.errorHandler(response.message);
          }
        },
        (error) => {
          this.errorHandler(error.message);
        }
      );
  }

  acceptJob(id: number){
    this.http.post('http://localhost:3000/allasok/api/acceptPending', { id: id})
    .subscribe(
      (response: any) => {
        if(response.success){
          this.loadPendingAllasok();
          this.successHandler(response.message);
        }else{
          this.errorHandler(response.message)
        }
      },
      (error) => {
        this.errorHandler(error.message);
      }
    )
  }

  msgHandler(message: {success: boolean, message: string}){
    this.show_error = false;
    this.show_success = false;
    if(message.success){
      this.successHandler(message.message)
    }else{
      this.errorHandler(message.message)
    }
  }

  private errorHandler(message: string) {
    this.show_error = true;
    this.error_msg = message;
  }

  private successHandler(message: string) {
    this.show_success = true;
    this.success_msg = message;
  }
}
