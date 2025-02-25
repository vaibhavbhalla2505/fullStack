import { Component} from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
import { BookfetchService } from '../service/bookfetch.service';
import { Book } from '../app.component';
import { Observable,map} from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private sanitizer: DomSanitizer,private bookService: BookfetchService,private router: Router) {
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

  editBook(book: Book,i:number): void {
    this.bookService.setEditBook(book,i);
    this.router.navigate(['/add-book']);
  }

  deleteBook(book:Book): void {
    this.bookService.deleteBook(book).subscribe({
      next: () => {
        alert('Book deleted successfully');
        this.books$=this.bookService.getBooks();
      },
      error: (err) => console.error("Error:", err),
    });
    
  }

  searchAndFilterBooks(): void {
    this.books$ = this.bookService.getBooks().pipe(
      map((books: Book[]) => {
        let filteredBooks = books;
  
        if (this.searchValue.trim() !== '') {
          filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(this.searchValue.toLowerCase())
          );
        }
  
        if (this.selectedGenre.trim() !== '') {
          filteredBooks = filteredBooks.filter(book => book.genre === this.selectedGenre);
        }
  
        if (filteredBooks.length === 0) {
          alert('No books found with the given criteria!');
        }
  
        return filteredBooks;
      })
    );
  }
  
  sortByTitle(): void {
    this.books$ = this.books$.pipe(
      map((books) => {
        if (this.sortSelect === 'asc') {
          return [...books].sort((a, b) => a.title.localeCompare(b.title));
        } else if (this.sortSelect === 'desc') {
          return [...books].sort((a, b) => b.title.localeCompare(a.title));
        }
        return books;
      })
    );
  }  

  clearBook(): void {
    this.books$=this.bookService.getBooks();
    this.searchValue = '';
    this.sortSelect='';
  }
}
