import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-allaskereso-form',
  imports: [ MatIcon, ReactiveFormsModule],
  templateUrl: './allaskereso-form.component.html',
  styleUrl: './allaskereso-form.component.css'
})
export class AllaskeresoFormComponent {
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
    // TODO
    if(!this.register_form.valid){
      return;
    }

    const form = this.register_form.getRawValue();
    if( form.jelszo1 !== form.jelszo2){
      return;
    }

    // ha jelszot akar valtoztatni kell email
    // ha email-t akar valtoztatni kell jelszo
    if((!form.email && form.jelszo1 != '') || (!form.jelszo1 && form.email != '')){
      console.log("nem ok")
      return;
    }
    // !

    this.valid_form.emit({
      nev: `${form.k_nev} ${form.v_nev}`,
      email: (form.email)? form.email: localStorage.getItem("username"),
      vegzettseg: form.vegzettseg,
      jelszo: (form.jelszo1)? (sha256(sha256(form.jelszo1 as string + ((form.email)? form.email: localStorage.getItem("username"))))) : ''
    }) 
  }
}
