import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  MaxLengthValidator,
} from '@angular/forms';
import { Ceg } from '../../../shared/Model/Ceg';
import { sha256 } from 'js-sha256';
import { DisplayDirective } from '../../../shared/directives/display.directive';
import { ErrorMsgComponent } from '../../../shared/error-msg/error-msg.component';
import { SuccessMsgComponent } from "../../../shared/success-msg/success-msg.component"; 


@Component({
  selector: 'app-ceg-form',
  imports: [MatIcon, ReactiveFormsModule, DisplayDirective, ErrorMsgComponent, SuccessMsgComponent],
  templateUrl: './ceg-form.component.html',
  styleUrl: './ceg-form.component.css',
})
export class CegFormComponent {
  register_form = new FormGroup<CegForm>({
    adoazonosito: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)]
    }),
    nev: new FormControl<string>('', { nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
    jelszo1: new FormControl<string>('', { 
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    jelszo2: new FormControl<string>('', { 
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)] 
    }),
  });

   showError: boolean = false;
  error_msg: string = '';

  showSuccess:boolean = false;
  success_msg: string = '';

  @Output() valid_register = new EventEmitter<Ceg>();

  Submit() {
    this.errorsToFalse();

    if (
      this.register_form.valid &&
      this.register_form.value.jelszo1 === this.register_form.value.jelszo2
    ) {
      const form = this.register_form.getRawValue();
      this.valid_register.emit({
        adoazonosito: form.adoazonosito,
        neve: form.nev,
        email: form.email,
        jelszo: sha256(sha256(form.jelszo1+form.email)),
        ertekeles: 0,
        terulet: 0, //begéetett érték
      });
    } else if(this.register_form.value.jelszo1 != this.register_form.value.jelszo2){
      this.errorHandler("Jelszók nem egyeznek!");
    
    } else if(this.register_form.value.adoazonosito!.length < 6){
      this.errorHandler("Az adoazonosítónak 6 karakternek kell lennie!");


    }else{
      this.errorHandler("Üres mező / mezők!");
    }
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

type CegForm = {
  adoazonosito: FormControl<string>;
  nev: FormControl<string>;
  email: FormControl<string>;
  jelszo1: FormControl<string>;
  jelszo2: FormControl<string>;
};
