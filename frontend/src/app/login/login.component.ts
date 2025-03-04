import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent{
  constructor(private msalService: MsalService) {}

    login() {
      localStorage.setItem('loginType','login');
        this.msalService.loginRedirect({
          scopes: ['user.read'],
          prompt: 'login'
        });
    }
}
