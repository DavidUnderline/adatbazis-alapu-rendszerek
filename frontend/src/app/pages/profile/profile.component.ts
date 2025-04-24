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
  user_allas: Allaskereso | null = null;
  user_ceg: Ceg | null = null;
  user_email = localStorage.getItem('username');
  is_company = inject(IsCompanyService);

  constructor(private http: HttpClient) {
    (this.is_company.getIsCompany()) ? this.loadCeg() : this.loadAllaskereso();
  }

  loadCeg() {
    console.log("ceg");
    this.http
      .post<any>('http://localhost:3000/ceg/api/get', {
        email: this.user_email,
      })
      .subscribe(
        (response) => {
          const ceg_adat = response.ceg;
          this.user_ceg = {
            adoazonosito: ceg_adat[0] as string,
            email: this.user_email as string,
            neve: ceg_adat[1] as string,
            jelszo: '',
            ertekeles: ceg_adat[2],
            terulet: ceg_adat[3]
          };
          
          
        },
        (error) => {
          console.error(error);
        }
      );
  }

  loadAllaskereso() {
    console.log("allaskereso")
    this.http
      .post<any>('http://localhost:3000/allaskereso/api/get', {
        email: this.user_email,
      })
      .subscribe(
        (response) => {
          console.table(response);
          this.user_allas = {
            email: response[0] as string,
            nev: response[1] as string,
            jelszo: '',
            utolso_bejelentkezes: response[2] as Date,
            vegzettseg: response[3] as string,
            statusz: (response[4] as boolean) ? 'online' : 'inaktiv',
          };
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
