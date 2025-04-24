import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CV } from '../../../shared/Model/CV';

@Component({
  selector: 'app-cv-form',
  imports: [ MatIcon ],
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.css'
})
export class CvFormComponent {
  email= localStorage.getItem("username")
  cvs: CV[] = [];

  constructor(){
    //eddig létező CV-ket lehívni, feltölteni a cvs-be
  }

  addcv(cv_link: string){
    console.log(cv_link);
    
    if(cv_link.length > 10){
      this.cvs.push({link: cv_link});
    }
  }

  deleteById(index: number) {
    this.cvs.splice(index, 1);
  }

  updateCVs(){
    //TODO
  }



}


