import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsCompanyService {
  private key = 'is_company';
  isLogged = inject(LoginService);

  
  // constructor(){
  //   localStorage.setItem(this.key, JSON.stringify(false))
  // }
  
  setIsCompany(isCompany : boolean): void{
    if( !this.isLogged.isLoggedIn()){
      localStorage.setItem(this.key, JSON.stringify(isCompany));
    }
  }

  getIsCompany(): boolean {
    const is_company = localStorage.getItem(this.key);
    return is_company === 'true';
  }
}
