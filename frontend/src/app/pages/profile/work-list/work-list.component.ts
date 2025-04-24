import { Component } from '@angular/core';
import { Allas } from '../../../shared/Model/Allas';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-work-list',
  imports: [ MatIcon],
  templateUrl: './work-list.component.html',
  styleUrl: './work-list.component.css'
})
export class WorkListComponent {
  allasok: Allas[] = [];
}

