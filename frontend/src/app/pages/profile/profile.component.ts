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
import { DisplayDirective } from '../../shared/directives/display.directive';
import { WorkListComponent } from './work-list/work-list.component';
import { JobsService } from '../../services/jobs.service';
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';
import { SuccessMsgComponent } from '../../shared/success-msg/success-msg.component';
import { fakeAsync } from '@angular/core/testing';
import { LoginService } from '../../services/login.service';
import { AdminDatasComponent } from "./admin-datas/admin-datas.component";
import { CegDatasComponent } from "./ceg-datas/ceg-datas.component";
import { AllaskeresoDatasComponent } from "./allaskereso-datas/allaskereso-datas.component";
import { Moderator } from '../../shared/Model/Moderator';
import { AdminFormComponent } from "./admin-form/admin-form.component";
import { AllaskeresoJobsComponent } from './allaskereso-jobs/allaskereso-jobs.component';
import { CommonModule } from '@angular/common';
import { ApplicantsDialogComponent } from './applicants-dialog/applicants-dialog.component';

@Component({
  selector: 'app-profile',
  imports: [
    HttpClientModule,
    CegFormComponent,
    AllaskeresoFormComponent,
    // MatIcon,
    CvFormComponent,
    ErrorMsgComponent,
    SuccessMsgComponent,
    DisplayDirective,
    WorkListComponent,
    AdminDatasComponent,
    CegDatasComponent,
    AllaskeresoDatasComponent,
    AdminFormComponent,
    AllaskeresoJobsComponent,
    ApplicantsDialogComponent
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user_allas!: Allaskereso;
  user_ceg!: Ceg;
  user_moderator!: Moderator;

  user_email = localStorage.getItem('username');
  login_service = inject(LoginService);
  jobservice = inject(JobsService);

  show_error = false;
  error_msg: string = '';
  show_success = false;
  success_msg = '';

  show_applicant = false;
  applicant_job_id: number = 0;

  constructor(private http: HttpClient) {
    switch (this.login_service.getRole()) {
      case 'allaskereso':
        this.loadAllaskereso();
        break;
      case 'ceg':
        this.loadCeg();
        break;
      case 'admin':
        this.loadModerator();
        console.log("admin");
        break;
      default:
        //Ez kizárt dolog, mert nem tudom.
        break;
    }

    this.show_error = false;
    console.log('applied jobs: ', this.jobservice.getjobs());
  }

  loadCeg() {
    this.http
      .post<any>('http://localhost:3000/ceg/api/get', {
        email: this.user_email
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
    this.http
      .post<any>('http://localhost:3000/allaskereso/api/get', {
        email: this.user_email,
      })
      .subscribe(
        (response) => {
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

  loadModerator() {
    this.http
    .post<any>('http://localhost:3000/admin/api/get', { email: this.user_email})
    .subscribe(
      (response) => {
        console.table(response)
        if(response.success){
          this.user_moderator = {
            neve: response.neve,
            email: response.email
          };
        }else{
          this.errorHandler(response.message);
        }
      },
      (error)=> {});
  }

  modifyAllaskereso(user_data: any) {
    // TODO
    console.table(user_data);
    this.show_error = false;
    this.show_success = false;

    if (
      !user_data.nev.length &&
      !user_data.email.length &&
      !user_data.vegzettseg.length &&
      !user_data.jelszo.length
    ) {
      this.errorHandler('Nincs frissítendő adat');
      return;
    }

    if (
      user_data.email.length != 0 &&
      user_data.email != localStorage.getItem('username')
    )
      user_data.originalemail = localStorage.getItem('username');

    if (user_data.email.length == 0)
      user_data.email = localStorage.getItem('username');

    // console.table(user_data);
    // return;
    this.http
      .post<any>('http://localhost:3000/allaskereso/api/update', { user_data })
      .subscribe(
        (response) => {
          // console.table(response);
          if (response.success) {
            this.successHandler(response.message);
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
  }

  modifyCeg(data: any) {
    this.show_error = false;
    if (
      !data.adoazonosito.length &&
      !data.nev.length &&
      !data.email.length &&
      !data.jelszo.length
    ) {
      this.errorHandler('Nincs frissítendő adat');
      return;
    }

    if (
      data.email.length != 0 &&
      data.email != localStorage.getItem('username')
    )
      data.originalemail = localStorage.getItem('username');

    if (data.email.length == 0) data.email = localStorage.getItem('username');

    // console.table(user_data);
    this.http
      .post<any>('http://localhost:3000/ceg/api/update', { data })
      .subscribe(
        (response) => {
          console.table(response);
          if (response.success) {
            this.successHandler(response.message);
            localStorage.setItem('username', response.email);
            this.user_email = response.email;
            this.loadCeg();
          } else {
            this.errorHandler(response.message);
          }
        },
        (err) => {
          this.errorHandler(err);
        }
      );
  }

  modifyAdmin(data: {name: string, email: string, password: string}){
    
  }
  handleMsg(msg: { success: boolean; message: string }) {
    this.show_error = false;
    this.show_success = false;
    this.error_msg = '';
    this.success_msg = '';

    if (msg.message === undefined) {
      return;
    }

    if (msg.success) {
      this.successHandler(msg.message);
    } else {
      this.errorHandler(msg.message);
    }
  }
  errorHandler(error: string = "Ismeretlen hiba") {
    (this.show_error = true), (this.error_msg = error);
  }

  successHandler(success: string) {
    (this.show_success = true), (this.success_msg = success);
  }
}
