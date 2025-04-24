import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-success-msg',
  imports: [ MatIcon],
  templateUrl: './success-msg.component.html',
  styleUrl: './success-msg.component.css'
})
export class SuccessMsgComponent {
  @Input() success_msg: string = '';
}
