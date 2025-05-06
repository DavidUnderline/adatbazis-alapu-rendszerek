import { Component, EventEmitter, Output, OnInit, Input, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Allas } from '../../shared/Model/Allas';
import { MatIcon } from '@angular/material/icon';
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';
import { SuccessMsgComponent } from '../../shared/success-msg/success-msg.component';
import { DisplayDirective } from '../../shared/directives/display.directive';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddCityDialogComponent } from "./add-city-dialog/add-city-dialog.component";
import { JobsService } from '../../services/jobs.service';


@Component({
  selector: 'app-publish',
  imports: [
    ReactiveFormsModule,
    // FormsModule,
    MatIcon,
    ErrorMsgComponent,
    SuccessMsgComponent,
    DisplayDirective,
    HttpClientModule,
    AddCityDialogComponent
],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.css',
})
export class PublishComponent implements OnInit {
  constructor(private http: HttpClient) {}
  disableSelect = new FormControl(false);

  ad_form = new FormGroup({
    cim: new FormControl<string>('', { nonNullable: true }),
    leiras: new FormControl<string>('', { nonNullable: true }),
    kovetelmenyek: new FormControl<string>('', { nonNullable: true }),
    ber: new FormControl<string>('', { nonNullable: true }),
    kategoria: new FormControl<string>('', { nonNullable: true }),
    varos: new FormControl<string>('', { nonNullable: true })
  });

  show_error = false;
  error_msg: string = '';
  show_success = false;
  success_msg = '';
  @Input() showAddCity = false;
  cities: any[] = [];

  jobservice = inject(JobsService);

  ngOnInit(): void {
    // console.log("cities: ", localStorage.getItem("cities"));
    // localStorage.removeItem("cities");

    if(localStorage.getItem("cities") == null){
      this.http.get<any>('http://localhost:3000/terulet/api/getcities')
      .subscribe((response) => {
        console.table(response);
        if(response.success){
          this.cities = response.cities;
          localStorage.setItem("cities", JSON.stringify(response.cities));
          // this.successHandler(response.message);
          // console.log(this.cities)
        
        } else{
          this.errorHandler(response.message);
        }
      });
    } else{
      this.cities = JSON.parse(localStorage.getItem("cities")!);
    }
  }

  submit() {
    this.show_error = false;
    
    if(this.ad_form.getRawValue().ber == null || parseInt(this.ad_form.getRawValue().ber) < 0){
      this.errorHandler("Bérezées mező nem megfelelő!");
      return;
    }

    if (this.ad_form.valid) {
      const form = this.ad_form.getRawValue();
      
      if(!form.cim.length || 
         !form.kovetelmenyek.length ||
        //  parseInt(this.ad_form.getRawValue().ber) < 0 ||
         !form.varos.length ||
         !form.kategoria.length){
          this.errorHandler("Üres mező / mezők nem szabályosak - üresek!");
          return;
      }


      //TODO feltölteni databasebe.
      const allaslehetoseg = {
        cim: form.cim,
        kovetelmenyek: form.kovetelmenyek,
        ber: Number(form.ber),
        // kategoria_neve: form.kategoria,
        leiras: form.leiras,
        varos: form.varos,
        mikor: new Date(),
        is_accepted: false,
        // terulet_id: ceg.terulet_id,
        // ceg_adoazonosito: ceg.adoazonosito,
        kulcsszo_neve: '',
        email: localStorage.getItem('username')
      };
      console.table(allaslehetoseg);

      this.http.post<any>('http://localhost:3000/allasok/api/insert', { allaslehetoseg })
      .subscribe((response) => {
        console.table(response);
          if (response.success) {
            this.successHandler(response.message);
            this.jobservice.setjobs([allaslehetoseg]);
          } else {
            this.errorHandler(response.message);
          }
        },
        (err) => {
          this.errorHandler(err);
        }
      );
    
    } else{
      this.errorHandler("Nem megfelelő adatok!");
    }
  }

  errorHandler(error: string) {
    (this.show_error = true), (this.error_msg = error);
  }

  successHandler(success: string) {
    (this.show_success = true), (this.success_msg = success);
  }
}

