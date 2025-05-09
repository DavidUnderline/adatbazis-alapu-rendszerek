import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

import { DisplayDirective } from '../../../shared/directives/display.directive';
import { ErrorMsgComponent } from '../../../shared/error-msg/error-msg.component';
import { SuccessMsgComponent } from "../../../shared/success-msg/success-msg.component"; 

@Component({
  selector: 'app-add-city-dialog',
  imports: [ MatIcon, ReactiveFormsModule, DisplayDirective, ErrorMsgComponent, SuccessMsgComponent],
  templateUrl: './add-city-dialog.component.html',
  styleUrl: './add-city-dialog.component.css',
})
export class AddCityDialogComponent {
  @Output() show = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  showError: boolean = false;
  error_msg: string = '';

  showSuccess:boolean = false;
  success_msg: string = '';

  new_city_form = new FormGroup({
    orszag: new FormControl<string | null>(''),
    megye: new FormControl<string | null>(''),
    varos: new FormControl<string | null>(''),
  });

  close() {
    this.errorsToFalse();
    this.show.emit(false);
  }

  apply() {
    this.errorsToFalse();
    if(this.new_city_form.getRawValue().orszag == '' || this.new_city_form.getRawValue().megye == '' || this.new_city_form.getRawValue().varos == ''){
      this.errorHandler("Üres mező / mezők!");  
      return;
    }
    
    this.http.post<any>('http://localhost:3000/terulet/api/addCity', this.new_city_form.getRawValue())
    .subscribe((response) => {
      console.table(response);
      if(response.success){
        this.successHandler(response.message);

        // TODO
        // ! ha hozzaadunk varost akkor megint le kellene kerni
        // this.http.get<any>('http://localhost:3000/terulet/api/getcities')
        // .subscribe((response) => {
        //   // console.log("--- get cities ---");
        //   // console.table(response);
        //   if(response.success){
        //     this.cities = response.cities;
        //     localStorage.setItem("cities", JSON.stringify(response.cities));
        //     // this.successHandler(response.message);
        //     // console.log(this.cities)
          
        //   } else{
        //     this.errorHandler(response.message);
        //   }
        // });
      
      } else{
        this.errorHandler(response.message);
      }
    });

    console.table(this.new_city_form.getRawValue());
  }

  errorHandler(error: string) {
    (this.showError = true), (this.error_msg = error);
  }
  successHandler(success: string) {
    (this.showSuccess = true), (this.success_msg = success);
  }

  errorsToFalse() {
    this.showError = false;
    this.showSuccess = false;
  }
}
