import { Component, Input } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
})
export class RepositoryCardComponent {
  @Input() repo: any;
  @Input() loading: boolean = true;

  faLink = faLink;
}
