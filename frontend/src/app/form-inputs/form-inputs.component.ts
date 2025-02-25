import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../app.component';
import { BookfetchService } from '../service/bookfetch.service';

@Component({
  selector: 'app-form-inputs',
  templateUrl: './form-inputs.component.html'
})
export class FormInputsComponent implements OnInit {
  book: Book = {
    title: '',
    author: '',
    genre: '',
    publication_date: '',
    isbn: '',
    price: 0,
  };

  standardGenre: string[] = ['fiction', 'non-fiction', 'biography', 'history', 'politics', 'science', 'novel'];
  index:number | null = null;
  constructor(private bookService: BookfetchService, private router: Router) {}

  ngOnInit(): void {
    const bookToEdit = this.bookService.getEditBook();
    this.index = this.bookService.getIndex();
    if (bookToEdit) {
      this.book = bookToEdit;
      this.bookService.clearEdit();
    }
  }

  onSubmit(): boolean {

    if (!this.book.title) {
      alert('Please fill the title of the book');
      return false;
    }
    if (!this.book.author) {
      alert('Please enter the author name');
      return false;
    }
    if (!this.book.genre) {
      alert('Please select a genre');
      return false;
    }
   
    if(!this.book.price){
      alert('Please enter a price');
      return false;
    }

    const today = new Date();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const pubYear = parseInt(this.book.publication_date.substring(0, 4), 10);
    const pubMonth = parseInt(this.book.publication_date.substring(5, 7), 10);
    const pubDay = parseInt(this.book.publication_date.substring(8, 10), 10);

    if (currentYear < pubYear || 
        (currentYear === pubYear && currentMonth < pubMonth) || 
        (currentYear === pubYear && currentMonth === pubMonth && currentDate < pubDay)) {
      alert('Please enter the correct date');
      return false;
    }

    if (isNaN(Number(this.book.isbn)) || this.book.isbn.length !== 13) {
      alert('Please enter a valid ISBN-13 number');
      return false;
    }

    if(this.index!==null){
      this.bookService.updateBook(this.book).subscribe({
        next: () => {
          alert('Book updated successfully');
          this.router.navigate(['/book-details']);
        },
        error: (error) => {
          console.error('Error updating book:', error);
          alert('An error occurred while updating the book');
          return;
        },
      })
    }
    else{
      this.bookService.addBook(this.book).subscribe({
        next: () => {
          alert('Book added successfully');
          this.router.navigate(['/book-details']);
        },
        error: (error) => {
          console.error('Error adding book:', error);
          alert('An error occurred while adding the book');
          return;
        },
      });
    }
    
    this.resetForm();
    return true;
  }

  resetForm(): void {
    this.book = { title: '', author: '', isbn: '', genre: '', publication_date: '',price:0 };
  }
}
