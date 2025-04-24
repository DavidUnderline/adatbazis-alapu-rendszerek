import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Allas } from '../../../shared/Model/Allas';

@Component({
  selector: 'app-search-form',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent {
  @Output() valid_filter = new EventEmitter<Allas>();
  @Output() show = new EventEmitter<boolean>();
  work_filter = new FormGroup({
    form_keyword_company: new FormControl<string | null>(''),
    form_location: new FormControl<string | null>(''),
  });

  Submit() {
    if (
      this.work_filter.value.form_keyword_company === '' &&
      this.work_filter.value.form_location == ''
    ) {
      console.log('Üres form, nem elfogadható!');
      return;
    }

    // console.log(
    //   `[LOG]: ${this.work_filter.value?.form_keyword_company}\t${this.work_filter?.value.form_location}`
    // );
    //TODO ez csak egy dummy terulet-id összehozó, szerintem okos lenne egy hastablet összedobni ehez.
    let terulet_id: number =
      this.work_filter.value.form_location?.toLowerCase() === 'veszprém' ? 3
        : this.work_filter.value.form_location?.toLowerCase() === 'budapest'? 1
        : this.work_filter.value.form_location?.toLowerCase() === 'szekesfehervar'? 2
        : this.work_filter.value.form_location?.toLowerCase() === 'kaposvár'? 4
        : this.work_filter.value.form_location?.toLowerCase() === 'miskolc'? 5
        : 0;
    //TODO ez csak egy dummy ceg-id összehozó, szerintem okos lenne egy hastablet összedobni ehez.
    let ceg_adoazonosito: string =
      this.work_filter.value.form_location?.toLowerCase() == 'asus'
        ? '12345678-2-41'
        : '';

    let kulcsszo: string = this.work_filter.value.form_keyword_company ?? '';

    this.valid_filter.emit({
      cim: '',
      leiras: '',
      kovetelmenyek: '',
      mikor: new Date(),
      ber: 0,
      is_accepted: false,
      terulet_id: terulet_id,
      ceg_adoazonosito: ceg_adoazonosito,
      kulcsszo_neve: '',
      kategoria_neve: kulcsszo,
    });
  }

  showDialog(){
    this.show.emit(true);
  }
}
