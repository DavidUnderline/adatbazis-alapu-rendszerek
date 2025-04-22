import { Component, inject, OnInit } from '@angular/core';
import { WorkService } from '../../services/work.service';
import { Router } from '@angular/router';
import { Allas } from '../../shared/Model/Allas';

@Component({
  selector: 'app-work-details',
  imports: [],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.css',
})
export class WorkDetailsComponent implements OnInit {
  work = inject(WorkService);
  private router = inject(Router);

  ngOnInit(): void {
      if (this.work === null) {
        this.router.navigateByUrl("/search")
      }
  }
}
