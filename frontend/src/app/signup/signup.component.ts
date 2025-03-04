import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  constructor(private msalService: MsalService) {}
  signup() {
    localStorage.setItem('loginType','signup');
      this.msalService.loginRedirect({
        scopes: ['user.read'],
        prompt: 'login'
      });
  }
}
