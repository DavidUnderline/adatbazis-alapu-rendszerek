import { Component, inject, OnInit } from '@angular/core';
import { WorkService } from '../../services/work.service';
import { Router } from '@angular/router';
// import { Allas } from '../../shared/Model/Allas';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JobsService } from '../../services/jobs.service';
import { LutLocationsPipe } from '../../pipes/lut-locations.pipe';
import { CommonModule } from '@angular/common';
import { LutCompanyNamePipe } from '../../pipes/lut-company-name.pipe';
import { DisplayDirective } from '../../shared/directives/display.directive';
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';
import { SuccessMsgComponent } from "../../shared/success-msg/success-msg.component"; 
import { response } from 'express';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-work-details',
  imports: [
    HttpClientModule,
    LutLocationsPipe,
    LutCompanyNamePipe,
    CommonModule,
    DisplayDirective,
    ErrorMsgComponent,
    SuccessMsgComponent
  ],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.css',
})
export class WorkDetailsComponent implements OnInit {
  work = inject(WorkService);
  isLogged = inject(LoginService);
  private router = inject(Router);
  jobservice = inject(JobsService);

  showError: boolean = false;
  error_msg: string = '';

  showSuccess:boolean = false;
  success_msg: string = '';
  
  constructor(private http: HttpClient) {
    
  }
  
  ngOnInit(): void {
    this.showError = false;
    this.showSuccess = false;

    if (this.work === null) {
        this.router.navigateByUrl("/search")
      }
  }

  apply() {
    this.isapplied().subscribe(isApplied => {
      if (isApplied) {
        this.errorHandler("Az adott állást már megpályáztad!")
      } else {
        const data = {
          email: localStorage.getItem('username'),
          job_id: this.work.getWork()?.id
        }
        this.http.post<any>('http://localhost:3000/allaskereso/api/applyforjob', { data })
          .subscribe((response) => {
            if (response.success) {
              this.successHandler(response.message);
    
            } else {
              this.errorHandler(response.message);
            }
          },
          (error) => {
            this.errorHandler(error);
          }
        );
      }
    });
  }

  isapplied(): Observable<boolean> {
    const data = {
      email: localStorage.getItem('username'),
      tipo: "allaskereso"
    };
  
    return this.jobservice.getjobs(data).pipe(
      map(response => {
        if (response.success) {
          for (const job of response.jobs) {
            if (job.ID === this.work.getWork()?.id) {
              return true;
            }
          }
          return false;
        } else {
          this.errorHandler(response.message);
          return false;
        }
      }), // map

      catchError(error => {
        console.error(error);
        return of(false);
      })
    ); // pipe
  }

  // async isapplied(): Promise<any>{

  //   const data = {
  //     email: localStorage.getItem('username'),
  //     tipo: "allaskereso"
  //   }

  //   const postres = this.jobservice.getjobs(data).subscribe({
  //     next: (response) => {
  //       // console.log(response)
  //       if(response.success){
  //         // this.successHandler(response.message);
  //         for(const i of response.jobs){
  //           if(i.ID === this.work.getWork()?.id) {
  //             postres.closed = true;
  //             break;
  //           }
  //         }          
  //       } else {
  //         postres.closed = false;
  //         this.errorHandler(response.message);
  //       }
  //     }, error: (error) => {
  //       console.log(error)
  //     }
  //   });

  //   return await postres.closed;
  //   // if(this.jobservice.getjobs(data) == null){
  //   //   return false;
  //   // }
  // }

  errorHandler(error: string) {
    (this.showError = true), (this.error_msg = error);
  }
  successHandler(success: string) {
    (this.showSuccess = true), (this.success_msg = success);
  }
}
