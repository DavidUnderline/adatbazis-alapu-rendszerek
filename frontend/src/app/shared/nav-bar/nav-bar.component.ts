import { NgIf } from '@angular/common';
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
  isLogged = inject(LoginService);
  isCompany = inject( IsCompanyService)

  flip_isCompany(){
    console.log(this.isCompany.getIsCompany());
    this.isCompany.setIsCompany(!this.isCompany.getIsCompany())
    console.log(this.isCompany.getIsCompany());
  }
}
