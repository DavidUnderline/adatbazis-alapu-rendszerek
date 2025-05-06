import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-city-dialog',
  imports: [ MatIcon, ReactiveFormsModule],
  templateUrl: './add-city-dialog.component.html',
  styleUrl: './add-city-dialog.component.css',
})
export class AddCityDialogComponent {
  @Output() show = new EventEmitter<boolean>();

  new_city_form = new FormGroup({
    orszag: new FormControl<string | null>(''),
    megye: new FormControl<string | null>(''),
    varos: new FormControl<string | null>(''),
  });

  close() {
    this.show.emit(false);
  }

  apply() {
    console.table(this.new_city_form.getRawValue());
  }
}
