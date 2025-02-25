import { Component } from '@angular/core';
export interface Book{
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
export class AppComponent {
  title = 'frontend';
}
