import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DisplayDirective } from '../../../../shared/directives/display.directive';
import { ErrorMsgComponent } from '../../../../shared/error-msg/error-msg.component';
import { SuccessMsgComponent } from "../../../../shared/success-msg/success-msg.component"; 
import { LoginService } from '../../../../services/login.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-delete-user-form',
  imports: [ MatIcon, ReactiveFormsModule, DisplayDirective, ErrorMsgComponent, SuccessMsgComponent ],
  templateUrl: './delete-user-form.component.html',
  styleUrl: './delete-user-form.component.css',
})
export class DeleteUserFormComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  showError: boolean = false;
  error_msg: string = '';

  showSuccess:boolean = false;
  success_msg: string = '';

  userTypeForm!: FormGroup;
  loginservice = inject(LoginService);

  ngOnInit(): void {
    this.userTypeForm = new FormGroup({
      user: new FormControl('ceg'),
      email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    
  }


  delete_user() {
    this.errorsToFalse();
    if(this.userTypeForm.valid){
      const data = {
        email: this.userTypeForm.get('email')?.value,
        user: this.userTypeForm.get('user')?.value
      }

      this.http.post<any>('http://localhost:3000/admin/api/delete_user', data)
      .subscribe((response) => {
        console.log(response); 
        if (response.success) {
          this.successHandler(response.message);
          this.userTypeForm.reset();

          if(data.email === localStorage.getItem('username')){
            localStorage.removeItem('username');
            this.router.navigate(['/hero']);
            this.loginservice.logOut();
            this.loginservice.setLoginStatus(false);
          }

        } else{
          this.errorHandler(response.message);
        }
      },
        (error) => {console.error(error)}
      );
    } else{
      this.errorHandler("Email legalább 6 karakter!");
    }
    console.log(this.userTypeForm.get('email')?.value);
    console.log(this.userTypeForm.get('user')?.value);
  }

  errorHandler(error: string) {
    (this.showError = true), (this.error_msg = error);
  }
  successHandler(success: string) {
    (this.showSuccess = true), (this.success_msg = success);
  }

  errorsToFalse() {
    this.showError = false;
    this.showSuccess = false;
  }
}
