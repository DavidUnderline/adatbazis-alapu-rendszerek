import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsCompanyService {
  private key = 'is_company';

  // constructor(){
  //   localStorage.setItem(this.key, JSON.stringify(false))
  // }
  
  setIsCompany(isCompany : boolean): void{
    localStorage.setItem(this.key, JSON.stringify(isCompany));
  }

  getIsCompany(): boolean {
    const is_company = localStorage.getItem(this.key);
    return is_company === 'true';
  }
}
