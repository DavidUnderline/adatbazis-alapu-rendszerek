import { Component, inject } from '@angular/core';
import { Allaskereso } from '../../shared/Model/Allaskereso';
import { Ceg } from '../../shared/Model/Ceg';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';
import { IsCompanyService } from '../../services/is-company.service';
import { Allas } from '../../shared/Model/Allas';

@Component({
  selector: 'app-profile',
  imports: [HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user!: Allaskereso | Ceg;
  user_email = localStorage.getItem("username");
  is_company = inject(IsCompanyService);

  isAllaskereso(user: Allaskereso | Ceg): boolean{
    if("vegzettseg" in user){
      return true;
    }
    return false
  }

  
  constructor(private http: HttpClient) {
    
    this.http.post<any>("http://localhost:3000/allaskereso/api/get", { email: this.user_email}).subscribe(
      response => {
        if(this.is_company.getIsCompany()){

        }else{
          this.user = {
            email: response[0] as string,
            nev: response[1] as string,
            jelszo: '',
            utolso_bejelentkezes: response[2] as Date,
            vegzettseg: response[3] as string,
            statusz: (response[4] as boolean)? "online": "inaktiv",
          };
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
