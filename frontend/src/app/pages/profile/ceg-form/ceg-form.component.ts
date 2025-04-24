import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Ceg } from '../../../shared/Model/Ceg';

@Component({
  selector: 'app-ceg-form',
  imports: [ MatIcon, ReactiveFormsModule ],
  templateUrl: './ceg-form.component.html',
  styleUrl: './ceg-form.component.css'
})
export class CegFormComponent {
  register_form = new FormGroup<CegForm>({
    adoazonosito: new FormControl<string | null>(''),
    nev: new FormControl<string | null>(''),
    email: new FormControl<string | null>('')
  });
  @Output() valid_form = new EventEmitter<{
    adoazonosito: string | null,
    nev: string | null,
    email: string | null
  }> ();

  Submit(){
    if(this.register_form.valid){
      const form = this.register_form.getRawValue();
      console.table(form)
      this.valid_form.emit({
        adoazonosito: form.adoazonosito,
        nev: form.nev,
        email: form.email
      });
    }else{
      alert("hibás formátum.")
    }
  }

}

type CegForm = {
  adoazonosito: FormControl<string | null>;
  nev: FormControl<string | null>;
  email: FormControl<string | null>;
};
