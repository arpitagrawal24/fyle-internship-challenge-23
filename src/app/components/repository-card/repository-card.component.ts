import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrls: [
    '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css',
  ],
})
export class RepositoryCardComponent {
  @Input() repo: any;
  @Input() loading: boolean = true;
}
