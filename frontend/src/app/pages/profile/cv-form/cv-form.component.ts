import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CV } from '../../../shared/Model/CV';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-cv-form',
  imports: [ MatIcon, HttpClientModule ],
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.css'
})
export class CvFormComponent {
  email= localStorage.getItem("username")
  cvs: CV[] = [];

  constructor(private http: HttpClient){
    this.http.post<any>('http://localhost:3000/cv/api/CVget', {email: this.email}).subscribe(
      (response) => {
        if(response.success){
          localStorage.setItem("active_cv", response.cv_link[0][0]);
          // console.log(response.cv_link[0][0]);
          for(let i = 0; i < response.cv_link.length; ++i){
            this.showCV(response.cv_link[i][0]);
          }

        } else{
          console.log(response);
        }
      },(error) => {
        console.error(error);
      });
  }

  showCV(cv_link: string){
    if(cv_link.length > 10){
      this.cvs.push({link: cv_link});
    }
  }

  deleteById(index: number) {
   let cv = this.cvs.splice(index, 1)[0];
    this.http.delete<any>('http://localhost:3000/cv/api/CVdelete', { body: { cv_link: cv.link } }).subscribe(
      (response) => {
        // TODO
        if(response.success){
          console.log(response);
          
        } else{
          console.log(response);
        }
        // !
      }, (error) => {
        console.error(error);
      }
    )
  }

  insertCV(){
    for (let key in this.cvs) {
      const cv: CV = this.cvs[key];
      this.http.post<any>('http://localhost:3000/cv/api/CVinsert', 
        {cv_link: cv.link, email: this.email})
        .subscribe((response) => {
          // TODO
          if(response.success){
            console.log(response);
            
          } else{
            console.log(response);
          } 
          // !
        },(error) => {
          console.log("error")
          console.error(error);
        }
      )
    }
  }

}


