import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ErrorHandler, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-add-admin-form',
  imports: [MatIcon, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-admin-form.component.html',
  styleUrl: './add-admin-form.component.css',
})
export class AddAdminFormComponent {
  new_admin_data = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });

  @Output() msg = new EventEmitter<{
    success: boolean;
    message: string;
  }>();

  constructor(private http: HttpClient) {}

  add() {
    if (this.new_admin_data.invalid) {
      this.msg.emit({ success: false, message: 'Hibás formátum.' });
      return;
    }
    let _admin_data = this.new_admin_data.getRawValue();
    _admin_data.password = sha256(sha256(_admin_data.password + _admin_data.email))
    console.table(_admin_data);
    console.log(
      !(_admin_data.email && _admin_data.name && _admin_data.password)
    );
    if (!(_admin_data.email && _admin_data.name && _admin_data.password)) {
      this.msg.emit({ success: false, message: 'Hibás formátum.' });
      return;
    }
    this.http
      .post('http://localhost:3000/admin/api/insert', _admin_data)
      .subscribe(
        (result: any) => {
          console.log(result)
          this.msg.emit({
            success: result.success,
            message: result.message
          })
        },
        (error) => {
          this.msg.emit({success: false, message: error.error})
        }
      );
  }
}
