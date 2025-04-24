import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

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
    vegzettseg : new FormControl<string | null>('')
  });
  
  @Output() valid_form = new EventEmitter<{
    nev: string | null,
    email: string| null,
    vegzettseg: string | null 
  }>();

  Submit(){
    if (this.register_form.valid){
      const form = this.register_form.getRawValue();
      this.valid_form.emit({
        nev: `${form.v_nev} ${form.k_nev}`,
        email: form.email,
        vegzettseg: form.vegzettseg
      });
    }
  }
}
