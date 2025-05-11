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
import { KeyWordFormComponent } from "./key-word-form/key-word-form.component";
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';

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
    AddCityDialogComponent,
    KeyWordFormComponent,
    AddCategoryDialogComponent
],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.css',
})
export class PublishComponent implements OnInit {
  constructor(private http: HttpClient) {}
  disableSelect = new FormControl(false);
  key_words: string[] = [];

  ad_form = new FormGroup({
    cim: new FormControl<string>('', { nonNullable: true }),
    leiras: new FormControl<string>('', { nonNullable: true }),
    kovetelmenyek: new FormControl<string>('', { nonNullable: true }),
    ber: new FormControl<string>('', { nonNullable: true }),
    kategoria: new FormControl<string>('', { nonNullable: true }),
    kulcsszo: new FormControl<string>('', { nonNullable: true }),
    varos: new FormControl<string>('', { nonNullable: true })
  });

  show_error = false;
  error_msg: string = '';
  show_success = false;
  success_msg = '';

  @Input() showAddCity = false;
  @Input() showAddCategory = false;

  cities: any[] = [];
  categories: any[] = [];

  jobservice = inject(JobsService);

  ngOnInit(): void {
    this.loadcities();
    this.loadcategories();
  }


  loadcities(){
     // console.log("get cities");
    //  localStorage.removeItem("cities");
    
     this.http.get<any>('http://localhost:3000/terulet/api/getcities')
     .subscribe((response) => {
       // console.log("--- get cities ---");
       // console.table(response);
       if(response.success){
        console.table(response.cities);
         this.cities = response.cities;
         // this.successHandler(response.message);
         // console.log(this.cities)
     
       } else{
         this.errorHandler(response.message);
       }
     });
  }

  loadcategories(){
    this.http.get<any>('http://localhost:3000/kategoria/api/getcategories')
     .subscribe((response) => {
       // console.log("--- get keywords ---");
       // console.table(response);
       if(response.success){
         this.categories = response.keywords;
     
       } else{
         this.errorHandler(response.message);
       }
     });
  }
  submit() {
    this.show_error = false;
    
    if(this.ad_form.getRawValue().ber.length == 0 || parseInt(this.ad_form.getRawValue().ber) <= 0){
      this.errorHandler("Bérezées mező nem megfelelő!");
      return;
    }

    if (this.ad_form.valid) {
      const form = this.ad_form.getRawValue();

      if(!form.cim.length || 
         !form.kovetelmenyek.length ||
         !form.varos.length ||
         !form.kategoria.length){
          this.errorHandler("Üres mező / mezők, helytelen formátum!");
          return;
      }

      const allaslehetoseg = {
        cim: form.cim,
        kovetelmenyek: form.kovetelmenyek,
        ber: form.ber,
        // kategoria_neve: form.kategoria,
        leiras: form.leiras,
        varos: form.varos,
        mikor: new Date(),
        is_accepted: false,
        // terulet_id: ceg.terulet_id,
        // ceg_adoazonosito: ceg.adoazonosito,
        kategoria: form.kategoria,
        email: localStorage.getItem('username')
      };
      console.table(allaslehetoseg);

      this.http.post<any>('http://localhost:3000/allasok/api/insert', { allaslehetoseg })
      .subscribe((response) => {
        console.table(response);
          if (response.success) {
            this.successHandler(response.message);
          } else {
            this.errorHandler(response.message);
          }
        },
        (err) => {
          this.errorHandler(err.error);
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

