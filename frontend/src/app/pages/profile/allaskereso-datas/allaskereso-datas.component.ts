import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Allaskereso } from '../../../shared/Model/Allaskereso';

@Component({
  selector: 'app-allaskereso-datas',
  imports: [ MatIcon],
  templateUrl: './allaskereso-datas.component.html',
  styleUrl: './allaskereso-datas.component.css'
})
export class AllaskeresoDatasComponent {
  @Input() allaskereso_data!: Allaskereso
}
