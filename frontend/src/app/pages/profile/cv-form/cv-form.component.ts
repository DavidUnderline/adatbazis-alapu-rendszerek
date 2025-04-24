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
    this.http.post('http://localhost:3000/cv/api/CVget', {email: this.email}).subscribe(
      (response: any) => {
        console.table(response);
        for(let i = 0; i < response.length; i++){
        
          this.addcv(response[i][0]);
        };
      },(error) => {

      }
    )
  }

  addcv(cv_link: string){
    if(cv_link.length > 10){
      
      this.cvs.push({link: cv_link});
    }
  }

  deleteById(index: number) {
   let cv = this.cvs.splice(index, 1)[0];
    this.http.delete('http://localhost:3000/cv/api/CVdelete', { body: { cv_link: cv.link } }).subscribe(
      (response) => {

      }, (error) => {
        console.error(error);
      }
    )
  }

  updateCVs(){
    for (let key in this.cvs) {
      const cv: CV = this.cvs[key];
      this.http.post('http://localhost:3000/cv/api/CVinsert', {cv_link: cv.link, email: this.email}).subscribe(
        (response: any) => {
          console.log(response.success)
        },(error) => {
          console.error(error);
        }
      )
    }
  }



}


