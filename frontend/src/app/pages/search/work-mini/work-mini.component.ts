import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Allas } from '../../../shared/Model/Allas';
import { LutCompanyNamePipe } from '../../../pipes/lut-company-name.pipe';
import { LutLocationsPipe } from '../../../pipes/lut-locations.pipe';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WorkService } from '../../../services/work.service';
import { CegErtekelesServiceService } from '../../../services/ceg-ertekeles-service.service';
import { DisplayDirective } from '../../../shared/directives/display.directive';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-work-mini',
  imports: [MatIcon, LutCompanyNamePipe, LutLocationsPipe, CommonModule, DisplayDirective],
  templateUrl: './work-mini.component.html',
  styleUrl: './work-mini.component.css',
})
export class WorkMiniComponent implements OnInit {

  @Input() work!: any;
  private work_service = inject(WorkService);
  private router = inject(Router);
  private ceg_erteles_service = inject(CegErtekelesServiceService);
  private local_email = localStorage.getItem("username") ?? '';
  
  login_service = inject(LoginService);
  stars = new Map<number, boolean>();
  rating = 0;
  hoverRating = 0;
  ceg_ertekeles: number = 0
  is_ertekelt_by_user: boolean = false;

  ngOnInit(): void {
    this.ceg_erteles_service.getCegErtekeles(this.work.ceg_adoazonosito).then(
      res => {
        this.ceg_ertekeles = res
      },
      err => { console.error(err)}
    )
    for (let i = 0; i < 5; i++) {
      this.stars.set(i+1, false);
    }

    this.ceg_erteles_service.getCegErtekeles(this.work.ceg_adoazonosito, this.local_email).then(
      res => {
        this.is_ertekelt_by_user = (res)? true : false; 
        console.log([this.work.id, this.is_ertekelt_by_user]);
      },
      err => {
        console.error(err);
      }
    )
  }

  setRating(rating: number){
    this.rating = rating;
  }
  
  submit(){
    if (!this.local_email)
      console.error("Jelentkezzél be.")
    console.log(this.rating)
    this.ceg_erteles_service.setErtekeles(this.rating, this.local_email, this.work.ceg_adoazonosito)
    this.is_ertekelt_by_user = true;
  }
  

  

  navigate(work: Allas) {
    this.work_service.setWork(work);
    this.router.navigateByUrl('/work-details');
  }
}
