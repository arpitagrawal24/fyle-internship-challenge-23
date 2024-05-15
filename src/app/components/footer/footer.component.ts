import { Component } from '@angular/core';
import { faFacebook, faLinkedin, faInstagram, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  inputs: ['faFacebook', 'faLinkedin', 'faInstagram', 'faTwitter', 'faGithub'],
})
export class FooterComponent {
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faGithub = faGithub;
}
