import { Component } from '@angular/core';
import { Allaskereso } from '../../shared/Model/Allaskereso';
import { Ceg } from '../../shared/Model/Ceg';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
  user!: Allaskereso | Ceg

  constructor(){
     

  }

}
