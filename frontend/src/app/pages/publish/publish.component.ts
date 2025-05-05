import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Allas } from '../../shared/Model/Allas';
import { MatIcon } from '@angular/material/icon';
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';
import { SuccessMsgComponent } from '../../shared/success-msg/success-msg.component';
import { DisplayDirective } from '../../shared/directives/display.directive';

@Component({
  selector: 'app-publish',
  imports: [
    ReactiveFormsModule,
    MatIcon,
    ErrorMsgComponent,
    SuccessMsgComponent,
    DisplayDirective
  ],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.css',
})
export class PublishComponent {
  ad_form = new FormGroup({
    cim: new FormControl<string>('', { nonNullable: true }),
    leiras: new FormControl<string>('', { nonNullable: true }),
    kovetelmenyek: new FormControl<string>('', { nonNullable: true }),
    ber: new FormControl<string>('', { nonNullable: true }),
    kategoria: new FormControl<string>('', { nonNullable: true }),
  });

  show_error = false;
  error_msg: string = '';
  show_success = false;
  success_msg = '';

  submit() {
    this.show_error = false;
    
    if(this.ad_form.getRawValue().ber == null || parseInt(this.ad_form.getRawValue().ber) < 0){
      this.errorHandler("Bérezées mező nem megfelelő!");
      return;
    }

    if (this.ad_form.valid) {
      const form = this.ad_form.getRawValue();
      // const ceg = {
      //   adoazonosito: '12345-67-89',
      //   terulet_id: 0,
      // }; //?bejelentkezett ceg adatai.
      
      if(!form.cim.length || 
         !form.kovetelmenyek.length ||
         !form.ber.length ||
         !form.kategoria.length){
          this.errorHandler("Üres mező / mezők nem szabályosak - üresek!");
          return;
      }


      //TODO feltölteni databasebe.
      const allaslehetoseg = {
        cim: form.cim,
        kovetelmenyek: form.kovetelmenyek,
        ber: Number(form.ber),
        // kategoria_neve: form.kategoria,
        leiras: form.leiras,
        mikor: new Date(),
        is_accepted: false,
        // terulet_id: ceg.terulet_id,
        // ceg_adoazonosito: ceg.adoazonosito,
        kulcsszo_neve: '',
      };
      console.table(allaslehetoseg);    
    
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

