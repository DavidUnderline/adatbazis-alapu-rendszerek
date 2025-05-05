import { Component, inject, OnInit } from '@angular/core';
import { WorkService } from '../../services/work.service';
import { Router } from '@angular/router';
// import { Allas } from '../../shared/Model/Allas';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';
import { DisplayDirective } from '../../shared/directives/display.directive';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-work-details',
  imports: [
    HttpClientModule,
    ErrorMsgComponent,
    DisplayDirective
  ],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.css',
})
export class WorkDetailsComponent implements OnInit {
  work = inject(WorkService);
  isLogged = inject(LoginService);
  private router = inject(Router);
  jobservice = inject(JobsService);

  show_error = false;
  error_msg: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      if (this.work === null) {
        this.router.navigateByUrl("/search")
      }
  }

  apply() {
    if(this.isapplied()){
      console.log(this.isapplied());
      return;
    }

    const data = {
      email: localStorage.getItem('username'),
      job_id: this.work.getWork()?.id
      // cv_link: localStorage.getItem('active_cv'),
      // ceg_id: this.work.getWork()?.
    }
    this.http.post<any>('http://localhost:3000/allaskereso/api/applyforjob', { data })
      .subscribe((response) => {
        if (response.success) {
          // console.log("-- POST RESPONSE --");
          // console.table(response);
          this.jobservice.setjobs(response.jobs);

        } else {
          console.log(response);
        }
      },
      (error) => {
        this.errorHandler(error);
      }
    );
  }

  isapplied(){
    if(this.jobservice.getjobs() == null){
      return false;
    }

    for(const i of this.jobservice.getjobs()){
      if(i.ID === this.work.getWork()?.id)
        return true;
    }

    return false;
  }

  errorHandler(error: string) {
    (this.show_error = true), (this.error_msg = error);
  }
}
