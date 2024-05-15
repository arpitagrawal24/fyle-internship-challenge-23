import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: [
    '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css',
  ],
})
export class UserDetailsComponent {
  @Input() user: any;
}
