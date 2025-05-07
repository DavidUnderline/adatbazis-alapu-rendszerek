import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Allaskereso } from '../../../shared/Model/Allaskereso';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';
import { CV } from '../../../shared/Model/CV';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-applicants-dialog',
  imports: [ MatIcon, HttpClientModule],
  templateUrl: './applicants-dialog.component.html',
  styleUrl: './applicants-dialog.component.css'
})
export class ApplicantsDialogComponent implements OnChanges {

  jelentkezok: {
    data: Allaskereso,
    cvk: CV[]
  }[] = [];
  @Output() show = new EventEmitter<boolean>();
  @Input() job_id: number | undefined;
  constructor(private http: HttpClient, ) {}


  ngOnChanges(): void {
    if (!this.job_id){
      return;
    }

    this.jelentkezok = [];
    let emails: string[] = [];
    this.http.post('http://localhost:3000/jelentkezo/api/getJelentkezo', { job_id: this.job_id })
    .subscribe(
      (response: any) => {
        if(response.success){
          response.applicants.map((email: any) => {
            emails.push(email[0]);
          });
          this.getApplicantData(emails);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getApplicantData(emails: string[]){
    
    if(emails.length < 1){
      return;
    }
    emails.forEach((email) => {
      console.log(email);
      this.http.post('http://localhost:3000/allaskereso/api/get', {email: email})
      .subscribe(
        (response:any) => { 
          console.log(response);
          this.jelentkezok?.push({
            data: { 
            email: response[0],
            jelszo: '',
            nev: response[1],
            utolso_bejelentkezes: response[2] as Date,
            vegzettseg: response[3],
            statusz: (response[4])? "online" : "passziv",
            },
            cvk: []
          });
          this.loadCvs();
        },
        (error) => {console.error(error)}
      );
    });
  }

  loadCvs(){
    this.jelentkezok?.map((jelentkezo) => {
      this.http.post('http://localhost:3000/cv/api/CVget', {email: jelentkezo.data.email}).subscribe(
        (response: any) => {
          if(response.success){
            response.cv_link.map((cv_link_arr: any) => {
              jelentkezo.cvk.push({
                link: cv_link_arr[0]
              })
            })
          }
        },
        (error) => {
          console.error(error)
        }
      )
    });
  }


  close(){
    this.show.emit(false);
  }
  
}
