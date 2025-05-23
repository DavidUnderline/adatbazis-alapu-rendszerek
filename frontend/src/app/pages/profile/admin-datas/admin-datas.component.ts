import { Component, Input, OnInit } from '@angular/core';
import { Moderator } from '../../../shared/Model/Moderator';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-admin-datas',
  imports: [ MatIcon],
  templateUrl: './admin-datas.component.html',
  styleUrl: './admin-datas.component.css'
})
export class AdminDatasComponent implements OnInit{
  @Input() admin_data:  Moderator | undefined
  
  ngOnInit(){
    console.log(this.admin_data);
  }
}
