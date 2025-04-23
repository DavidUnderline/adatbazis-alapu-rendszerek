import { Component, inject } from '@angular/core';
import { Allaskereso } from '../../shared/Model/Allaskereso';
import users from '../../shared/dummy_data/users.json';
import { Ceg } from '../../shared/Model/Ceg';
import { AllaskeresoFormComponent } from './allaskereso-form/allaskereso-form.component';
import { CegFormComponent } from './ceg-form/ceg-form.component';
import { IsCompanyService } from '../../services/is-company.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { last } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [AllaskeresoFormComponent, CegFormComponent, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isCompany = inject(IsCompanyService)
  router = inject(Router);
  valid_register!: Allaskereso | Ceg;

  constructor(private http: HttpClient){}

  register_user(user: Allaskereso | Ceg) {
    if ('vegzettseg' in user) {
      // console.log('[LOG]: User is of type Allaskereso');
      // console.log(user);
      const registerData = { 
        email: user.email, 
        name: user.nev,
        password: user.jelszo,
        last_signed_in: new Date(),
        education: user.vegzettseg,
        status: user.statusz
      };

      this.http.post<any>('http://localhost:3000/allaskereso/api/register', registerData).subscribe(
        response => {
            if (response.success) {
              console.table(response);
              // this.loginservice.setLoginStatus(true);
              // localStorage.setItem('username', response.EMAIL);
              // this.router.navigate(['/app']);
              
            } else {
                console.log("fail");
            }
        },
        error => {
            console.error(error);
        }
      );

    } else if ('adoazonosito' in user) {
      console.log('[LOG]: User is of type Ceg');
    } else {
      console.log('[LOG]: Unknown user type');
    }

    console.table(user)

    let temp = users;

    // this.router.navigateByUrl("/login");
  }
}
