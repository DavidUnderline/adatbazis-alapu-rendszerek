import { Component, inject } from '@angular/core';
import { Allaskereso } from '../../shared/Model/Allaskereso';
import { Ceg } from '../../shared/Model/Ceg';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { response } from 'express';
import { IsCompanyService } from '../../services/is-company.service';
// import { Allas } from '../../shared/Model/Allas';
import { CegFormComponent } from './ceg-form/ceg-form.component';
import { AllaskeresoFormComponent } from './allaskereso-form/allaskereso-form.component';
import { MatIcon } from '@angular/material/icon';
import { CvFormComponent } from './cv-form/cv-form.component';
import { CV } from '../../shared/Model/CV';
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';
import { DisplayDirective } from '../../shared/directives/display.directive';
import { WorkListComponent } from './work-list/work-list.component';
@Component({
  selector: 'app-profile',
  imports: [
    HttpClientModule,
    CegFormComponent,
    AllaskeresoFormComponent,
    MatIcon,
    CvFormComponent,
    ErrorMsgComponent,
    DisplayDirective,
    WorkListComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user_allas: Allaskereso | null = null;
  user_ceg: Ceg | null = null;
  user_email = localStorage.getItem('username');
  is_company = inject(IsCompanyService);
  show_error = false;
  error_msg: string = '';

  constructor(private http: HttpClient) {
    this.is_company.getIsCompany() ? this.loadCeg() : this.loadAllaskereso();
    this.show_error = false;
  }

  loadCeg() {
    this.http.post<any>('http://localhost:3000/ceg/api/get', {
        email: this.user_email,
      }).subscribe((response) => {
          const ceg_adat = response.ceg;
          this.user_ceg = {
            adoazonosito: ceg_adat[0] as string,
            email: this.user_email as string,
            neve: ceg_adat[1] as string,
            jelszo: '',
            ertekeles: ceg_adat[2],
            terulet: ceg_adat[3],
          };
        },
        (error) => {
          this.errorHandler(error);
        }
      );
  }

  loadAllaskereso() {
    // console.log(this.user_email);
    this.http.post<any>('http://localhost:3000/allaskereso/api/get', {
        email: this.user_email,
      }).subscribe((response) => {
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
          this.errorHandler(error);
        }
      );
  }

  modifyAllaskereso(user_data: any) {
    if(user_data.email != localStorage.getItem('username'))
      user_data.originalemail = localStorage.getItem('username');

    this.http.post<any>('http://localhost:3000/allaskereso/api/update', {
        email: user_data.email,
        neve: user_data.nev,
        vegzettseg: user_data.vegzettseg,
        jelszo: user_data.jelszo,
      }).subscribe((response) => {
          if (response.success) {
            localStorage.setItem('username', response.email);
            this.user_email = response.email;
            this.loadAllaskereso();
          } else {
            this.errorHandler(response.message);
          }
        },
        (err) => {
          this.errorHandler(err);
        }
      );

    // Todo
  }

  uploadCVs(cvs: CV[]) {
    // TODO
  }

  modifyCeg(datas: {
    adoazonosito: string | null;
    nev: string | null;
    email: string | null;
    jelszo: string | null;
  }) {
    // Todo
  }

  errorHandler(error: string) {
    (this.show_error = true), (this.error_msg = error);
  }
}
