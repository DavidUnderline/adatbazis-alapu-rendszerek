import { Component, EventEmitter, Output, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
// import { Allas } from '../../../shared/Model/Allas';

@Component({
  selector: 'app-search-filter-dialog',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './search-filter-dialog.component.html',
  styleUrl: './search-filter-dialog.component.css',
})
export class SearchFilterDialogComponent {
  @Output('plus_filter') additional_filter_form_valid = new EventEmitter<{
    company: string | null,
    min: number,
    max: number
  }>();
  @Output() show = new EventEmitter<boolean>();

  additional_filter_form = new FormGroup({
    company: new FormControl<string | null>(''),
    min: new FormControl<number>(0, { nonNullable: true }),
    max: new FormControl<number>(0, { nonNullable: true }),
  });

  close() {
    this.show.emit(false);
  }

  apply() {
    // console.log(this.additional_filter_form.valid);
    if (this.additional_filter_form.valid) {
      const form = this.additional_filter_form.getRawValue();
      
      if((form.max > 0 && form.max > form.min) || (form.max === 0 && form.min === 0)){
        // console.table(form)
        this.additional_filter_form_valid.emit({
          company: form.company,
          min: form.min,
          max: form.max
        });
        this.close();
      }
    }
  }
}
