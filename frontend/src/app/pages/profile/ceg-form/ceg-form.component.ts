import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Ceg } from '../../../shared/Model/Ceg';
import { sha256 } from 'js-sha256';
import { ErrorMsgComponent } from '../../../shared/error-msg/error-msg.component';
import { DisplayDirective } from '../../../shared/directives/display.directive';


@Component({
  selector: 'app-ceg-form',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    ErrorMsgComponent,
    DisplayDirective,
  ],
  templateUrl: './ceg-form.component.html',
  styleUrl: './ceg-form.component.css',
})
export class CegFormComponent {
  show_error = false;
  error_msg: string = '';

  register_form = new FormGroup<CegForm>({
    adoazonosito: new FormControl<string | null>(''),
    nev: new FormControl<string | null>(''),
    email: new FormControl<string | null>(''),
    jelszo1: new FormControl<string | null>(''),
    jelszo2: new FormControl<string | null>(''),
  });
  
  @Output() valid_form = new EventEmitter<{
    adoazonosito: string | null;
    nev: string | null;
    email: string | null;
    jelszo: string | null;
  }>();

  Submit() {
    this.show_error = false;
    
    if (this.register_form.valid) {
      const form = this.register_form.getRawValue();
      // console.table(form);

      // ha email-t akar valtoztatni kell jelszo
    // console.log(form.email?.length, form.jelszo1?.length)
      if(form.email?.length != 0 && !form.jelszo1?.length){
        this.errorHandler("Jelszót is meg kell adni")
        return;
      }

      if(form.jelszo1 === form.jelszo2){
        this.valid_form.emit({
          adoazonosito: form.adoazonosito,
          nev: form.nev,
          email: form.email,
          jelszo: form.jelszo1 != '' ? sha256(sha256(form.jelszo1 as string + ((form.email)? form.email : localStorage.getItem("username")))) : '',
        });
      } else{
        this.errorHandler("Jelszavak nem egyeznek")
        return;
      }
    } else {
      alert('hibás formátum.');
    }
  }

  errorHandler(error: string) {
    (this.show_error = true), (this.error_msg = error);
  }
}


type CegForm = {
  adoazonosito: FormControl<string | null>;
  nev: FormControl<string | null>;
  email: FormControl<string | null>;
  jelszo1: FormControl<string | null>;
  jelszo2: FormControl<string | null>;
};
