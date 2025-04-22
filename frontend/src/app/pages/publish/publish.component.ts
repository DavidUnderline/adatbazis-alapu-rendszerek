import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Allas } from '../../shared/Model/Allas';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-publish',
  imports: [ ReactiveFormsModule, MatIcon],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.css'
})
export class PublishComponent {

  ad_form = new FormGroup({
    cim: new FormControl<string>('', {nonNullable: true}),
    leiras: new FormControl<string>('', {nonNullable: true}),
    kovetelmenyek: new FormControl<string>('', {nonNullable: true}),
    ber: new FormControl<string>('', {nonNullable: true}),
    kategoria: new FormControl<String>('', {nonNullable: true})
  });

  submit(){
    if(this.ad_form.valid){
      const form = this.ad_form.getRawValue();
      const ceg = {
        adoazonosito: "12345-67-89",
        terulet_id: 0
      }; //?bejelentkezett ceg adatai.
      
      //TODO feltölteni databasebe.
      const allaslehetoseg = <Allas>{
        cim: form.cim,
        leiras: form.leiras,
        kovetelmenyek: form.kovetelmenyek,
        mikor: new Date(),
        ber: Number(form.ber),
        is_accepted: false,
        terulet_id: ceg.terulet_id,
        ceg_adoazonosito: ceg.adoazonosito,
        kulcsszo_neve: "",
        kategoria_neve: form.kategoria
      };
    }


  }

}

