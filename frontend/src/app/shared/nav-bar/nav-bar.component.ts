import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { IsCompanyService } from '../../services/is-company.service';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  login_service = inject(LoginService)
  role = this.login_service.getRole();
  constructor(){
    console.log();
  }

  flip_isCompany(){
    
    this.login_service.changeNormalRoles();
  }
}
