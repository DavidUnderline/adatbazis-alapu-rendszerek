import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CV } from '../../../shared/Model/CV';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-cv-form',
  imports: [MatIcon, HttpClientModule],
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.css',
})
export class CvFormComponent {
  email = localStorage.getItem('username');
  cvs: CV[] = [];
  @Output() msg = new EventEmitter<{
    success: boolean;
    message: string;
  }>();

  constructor(private http: HttpClient) {
    this.http
      .post<any>('http://localhost:3000/cv/api/CVget', { email: this.email })
      .subscribe(
        (response) => {
          if (response.success) {
            console.table(response);
            response.cv_link.map((cv: string) => {
              if (cv.at(0) !== undefined) {
                this.showCV({
                  link: cv.at(0)!,
                });
              }
            });
          }
        },
        (error) => {
          this.msg.emit({
            success: false,
            message: error.error
          })
        }
      );
  }

  insertCV(cv_link: string) {
    if(cv_link.length < 10) return;

    this.http.post('http://localhost:3000/cv/api/CVinsert', {cv_link: cv_link, email: this.email}).subscribe(
      (response: any) => {
        if( response.success ){
          this.showCV({link: cv_link})
          this.msg.emit({
            success: true,
            message: response.message
          })
        }else{
          this.msg.emit({
            success: false,
            message: response.message
          })
        }
      },
      (error) => {
        this.msg.emit({
          success: false,
          message: error.error
        })
      }
    )
  }

  deleteById(index: number) {
    const deleted_cv: CV = this.cvs.splice(index, 1)[0];
    console.log(deleted_cv.link)
    this.http.delete('http://localhost:3000/cv/api/CVdelete', { body: { cv_link: deleted_cv.link } }).subscribe(
      (response: any) => {
        if (response.success) {
          this.msg.emit({
            success: true,
            message: response.message
          });
        } else {
          this.msg.emit({
            success: false,
            message: response.message
          });
        }
      },
      (error) => {
        this.msg.emit({
          success: false,
          message: error.error
        });
      }
    );
  }

  //! Felpusholja a CV-ket lokálba, hogy látható legyen.
  showCV(cv: CV) {
    if (cv.link.length >= 10) {
      this.cvs.push(cv);
    }
  }
}
