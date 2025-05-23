import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
// import { Allas } from '../../../shared/Model/Allas';

@Component({
  selector: 'app-search-form',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent {
  @Output() valid_filter = new EventEmitter<any>();
  @Output() show = new EventEmitter<boolean>();
  work_filter = new FormGroup({
    form_category: new FormControl<string | null>(''),
    form_keyword: new FormControl<string | null>(''),
    form_location: new FormControl<string | null>(''),
  });

  Submit() {
    this.valid_filter.emit({
      city: this.work_filter.value.form_location ?? '',
      keyword: this.work_filter.value.form_keyword ?? '',
      category: this.work_filter.value.form_category ?? '',
    });

    return;
  }

  showDialog(){
    this.show.emit(true);
  }
}
