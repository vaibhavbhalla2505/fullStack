import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  userName: string | null = null;

  constructor(private msalService: MsalService) {}

  ngOnInit(): void {
    const account = this.msalService.instance.getActiveAccount();
    if (account) {
      this.isAuthenticated = true;
      this.userName = account.username;
    }
  }

  logout() {
    this.msalService.logoutRedirect({
      account: this.msalService.instance.getActiveAccount(), 
    });
  
    localStorage.clear();
    sessionStorage.clear();
  }
}
