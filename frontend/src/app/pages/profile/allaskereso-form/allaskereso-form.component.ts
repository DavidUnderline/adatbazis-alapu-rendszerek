import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { sha256 } from 'js-sha256';
import { ErrorMsgComponent } from '../../../shared/error-msg/error-msg.component';
import { DisplayDirective } from '../../../shared/directives/display.directive';

@Component({
  selector: 'app-allaskereso-form',
  imports: [ 
    MatIcon, 
    ReactiveFormsModule,
    ErrorMsgComponent,
    DisplayDirective,
    ],
  templateUrl: './allaskereso-form.component.html',
  styleUrl: './allaskereso-form.component.css'
})
export class AllaskeresoFormComponent {
  show_error = false;
  error_msg: string = '';

  register_form = new FormGroup({
    k_nev: new FormControl<string | null>(''),
    v_nev: new FormControl<string | null>(''),
    email: new FormControl<string | null>(''),
    vegzettseg : new FormControl<string | null>(''),
    jelszo1: new FormControl<string| null>(''),
    jelszo2: new FormControl<string | null>('')
  });
  
  @Output() valid_form = new EventEmitter<{
    nev: string | null,
    email: string| null,
    vegzettseg: string | null,
    jelszo: string | null 
  }>();

  Submit(){
    this.show_error = false;

    if(!this.register_form.valid){
      return;
    }

    const form = this.register_form.getRawValue();
    if(form.jelszo1 !== form.jelszo2){
      this.errorHandler("Jelszók nem egyeznek")
      return;
    }

    // ha email-t akar valtoztatni kell jelszo
    // console.log(form.email?.length, form.jelszo1?.length)
    if(form.email?.length != 0 && !form.jelszo1?.length){
      this.errorHandler("Jelszót is meg kell adni")
      return;
    }

    this.valid_form.emit({
      nev: `${form.k_nev}` + `${form.v_nev}`,
      email: (form.email),
      vegzettseg: form.vegzettseg,
      jelszo: (form.jelszo1)? (sha256(sha256(form.jelszo1 as string + ((form.email)? form.email: localStorage.getItem("username"))))) : ''
    })
  }

  errorHandler(error: string) {
    (this.show_error = true), (this.error_msg = error);
  }
}
