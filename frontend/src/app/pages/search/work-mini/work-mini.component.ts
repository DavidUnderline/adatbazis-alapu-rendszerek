import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Allas } from '../../../shared/Model/Allas';
import { LutCompanyNamePipe } from '../../../pipes/lut-company-name.pipe';
import { LutLocationsPipe } from '../../../pipes/lut-locations.pipe';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WorkService } from '../../../services/work.service';

@Component({
  selector: 'app-work-mini',
  imports: [MatIcon, LutCompanyNamePipe, LutLocationsPipe, CommonModule],
  templateUrl: './work-mini.component.html',
  styleUrl: './work-mini.component.css',
})
export class WorkMiniComponent {
  @Input() work!: any;

  constructor(){
    
  }

  private work_service = inject(WorkService);
  private router = inject(Router);

  navigate(work: Allas){
    this.work_service.setWork(work);
    this.router.navigateByUrl("/work-details");
  }

}
