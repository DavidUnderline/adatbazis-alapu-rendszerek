import { Component, inject, OnInit } from '@angular/core';
import { WorkService } from '../../services/work.service';
import { Router } from '@angular/router';
// import { Allas } from '../../shared/Model/Allas';
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';
import { DisplayDirective } from '../../shared/directives/display.directive';

@Component({
  selector: 'app-work-details',
  imports: [
    HttpClientModule,
  ],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.css',
})
export class WorkDetailsComponent implements OnInit {
  work = inject(WorkService);
  isLogged = inject(LoginService);
  private router = inject(Router);

  show_error = false;
  error_msg: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      if (this.work === null) {
        this.router.navigateByUrl("/search")
      }
  }

  apply() {
    const data = {
      email: localStorage.getItem('username'),
      // cv_link: localStorage.getItem('active_cv'),
      // ceg_id: this.work.getWork()?.id
    }
    // this.http.post<any>('http://localhost:3000/allaskereso/api/applyforjob', { data }).subscribe((response) => {
    //     if (response.success) {
    //       console.log(response);
    //     } else {
    //       console.log(response);
    //     }
    //   },
    //   (error) => {
    //     this.errorHandler(error);
    //   }
    // );
  }

  errorHandler(error: string) {
    (this.show_error = true), (this.error_msg = error);
  }
}
