import { Component, Input } from '@angular/core';
import { Moderator } from '../../../shared/Model/Moderator';

@Component({
  selector: 'app-admin-datas',
  imports: [],
  templateUrl: './admin-datas.component.html',
  styleUrl: './admin-datas.component.css'
})
export class AdminDatasComponent {
  @Input() admin_data!:  Moderator
}
