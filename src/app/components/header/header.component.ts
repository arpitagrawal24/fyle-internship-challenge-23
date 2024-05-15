import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  username: string = '';

  @Output() search = new EventEmitter<string>();

  onUsernameChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.username = inputElement.value;
  }

  searchUser() {
    this.search.emit(this.username);
  }
}
