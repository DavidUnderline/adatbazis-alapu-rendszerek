import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { DisplayDirective } from '../../../shared/directives/display.directive';
import { ErrorMsgComponent } from '../../../shared/error-msg/error-msg.component';
import { SuccessMsgComponent } from "../../../shared/success-msg/success-msg.component"; 
@Component({
  selector: 'app-add-category-dialog',
  imports: [ReactiveFormsModule, MatIcon, DisplayDirective, ErrorMsgComponent, SuccessMsgComponent],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.css'
})
export class AddCategoryDialogComponent implements OnInit {
  @Output() show = new EventEmitter<boolean>();
   constructor(private http: HttpClient) {}

  showError: boolean = false;
  error_msg: string = '';

  showSuccess:boolean = false;
  success_msg: string = '';

  keyword =  new FormControl('', [Validators.required, Validators.minLength(3)]);
  
  @Output() load = new EventEmitter<void>();

  ngOnInit(): void {
      this.keyword.markAsUntouched();
  }

  close() {
    this.errorsToFalse();
    this.show.emit(false);
  }

  addkeyword() {
    this.errorsToFalse();
    // console.log(this.keyword.getRawValue())

    if(!this.keyword.valid){
      this.errorHandler("Üres mező!");  
      return;
    }
    
    this.http.post<any>('http://localhost:3000/kategoria/api/addcategory', {keyword: this.keyword.getRawValue()})
    .subscribe((response) => {
      console.table(response);
      if(response.success){
        this.successHandler(response.message);
        this.load.emit() // frissítünk
      } else{
        this.errorHandler(response.message);
      }
    });

  //   console.table(this.new_city_form.getRawValue());
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
