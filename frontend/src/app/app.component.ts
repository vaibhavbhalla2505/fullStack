import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BookfetchService } from './service/bookfetch.service';
export interface Book {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publication_date: string;
  price: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private msalService: MsalService, private router: Router,private http:HttpClient,private bookService:BookfetchService) {}

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise()
      .then((result: AuthenticationResult | null) => {
        if (result !== null && result.account) {
          this.msalService.instance.setActiveAccount(result.account);
      
          const data={email:result.account.username}

          if(localStorage.getItem('loginType')==='signup'){
            this.bookService.sendData(data).subscribe({
              next: (response) => {
                alert(response.message); 
                this.router.navigate(['/login']);
              },
              error: (error) => {
                console.error('Error fetching books:', error);
              }
            })
          }
          else{
            this.bookService.checkData(data).subscribe({
              next:(response)=>{
                alert(response.message);
                if(response.success==true){
                  this.router.navigate(['/book-details']);
                }
                else{
                  this.router.navigate(['/signup']); 
                }
              },
              error: (error) => {
                console.error('Error fetching books:', error);
              }
            })
          }
        } else {
          this.msalService.instance.setActiveAccount(null);
          localStorage.clear();
        }
      })
      .catch(error => {
        console.error("🚨 Authentication Error:", error);
      });
  }
}
