import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Ceg } from '../../../shared/Model/Ceg';

@Component({
  selector: 'app-ceg-datas',
  imports: [ MatIcon],
  templateUrl: './ceg-datas.component.html',
  styleUrl: './ceg-datas.component.css'
})
export class CegDatasComponent {
  @Input() ceg_data!: Ceg
}
