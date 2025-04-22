import { Component, inject } from '@angular/core';
import { Allaskereso } from '../../shared/Model/Allaskereso';
import users from '../../shared/dummy_data/users.json';
import { Ceg } from '../../shared/Model/Ceg';
import { AllaskeresoFormComponent } from './allaskereso-form/allaskereso-form.component';
import { CegFormComponent } from './ceg-form/ceg-form.component';
import { IsCompanyService } from '../../services/is-company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [AllaskeresoFormComponent, CegFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isCompany = inject(IsCompanyService)
  router = inject(Router);
  valid_register!: Allaskereso;

  register_user(user: Allaskereso | Ceg) {
    if ('vegzettseg' in user) {
      console.log('[LOG]: User is of type Allaskereso');
    } else if ('adoazonosito' in user) {
      console.log('[LOG]: User is of type Ceg');
    } else {
      console.log('[LOG]: Unknown user type');
    }

    console.table(user)

    let temp = users;

    this.router.navigateByUrl("/login");
  }
}
