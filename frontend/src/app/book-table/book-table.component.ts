import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
import { BookfetchService } from '../service/bookfetch.service';
import { Router } from '@angular/router';
import { Book } from '../app.component';
import { firstValueFrom,Observable } from 'rxjs';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html'
})
export class BookTableComponent{
  books$: Observable<Book[]>;
  searchValue: string = '';
  selectedGenre: String = '';
  sortSelect: String = '';
  standardGenre: string[] = [
    "fiction", "non-fiction", "biography", "history", "politics", "science", "novel"
  ];

  constructor(private sanitizer: DomSanitizer,private bookService: BookfetchService) {
    this.books$ = this.bookService.getBooks();
  }

  calculateAge = (date: string): string => {
    let pubYear = date.substring(0, 4);
    let pubMonth = date.substring(5, 7);
    let pubDay = date.substring(8, 10);

    let today = new Date();
    let currentDate = today.getDate();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();

    if (currentYear - parseInt(pubYear) > 0) {
      return `${currentYear - parseInt(pubYear)} years ago`;
    } else if (currentMonth - parseInt(pubMonth) > 0) {
      return `${currentMonth - parseInt(pubMonth)} months ago`;
    } else {
      return `${currentDate - parseInt(pubDay)} days ago`;
    }
  }

  discountCalculation = (actualP: number | undefined): SafeHtml => {
    if (actualP === undefined) {
      actualP = 0;
    }

    actualP = actualP ?? 0;
    const html = `<span class="text-green-600 font-bold">${actualP} rs/- </span>`;
    return this.sanitizer.bypassSecurityTrustHtml(html); 
  }

  editBook(book: Book): void {
  }

  deleteBook(): void {
  }

  searchAndFilterBooks(): void {
  }

  clearBook(): void {
  }

  sortByTitle(): void {
  }
}
