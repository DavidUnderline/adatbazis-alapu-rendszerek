import { Component } from '@angular/core';
import { RegisterFormComponent } from './register-form/register-form.component';
import { Allaskereso } from '../../shared/Model/Allaskereso';
import users from '../../shared/dummy_data/users.json';

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  valid_register!: Allaskereso;

  register_user(user: Allaskereso) {
    let temp = users;

    temp.forEach((_user) => {
      if (
        (<Allaskereso>_user).nev !== user.nev &&
        (<Allaskereso>_user).email !== user.email
      ) {
        users.push(user);
      }
    });
  }
}
