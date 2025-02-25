// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BookTableComponent } from './book-table.component';
// import { BookfetchService } from '../service/bookfetch.service';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// describe('BookTableComponent', () => {
//   let component: BookTableComponent;
//   let fixture: ComponentFixture<BookTableComponent>;
//   let fetchService: BookfetchService;
//   let router: Router;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,      
//         HttpClientTestingModule,    
//         FormsModule,                
//         CommonModule       
//       ],
//       declarations:[BookTableComponent],
//       providers: [BookfetchService],
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(BookTableComponent);
//     component = fixture.componentInstance;
//     fetchService = TestBed.inject(BookfetchService);
//     router = TestBed.inject(Router);
//   });


//   it('should create the component', () => {
//     expect(component).toBeDefined();
//   });

//   it('should fetch books on init', () => {
//     const mockBooks = [
//       { title: 'Book 1', author: 'Author 1', isbn: '123', date: '2020-01-01', genre: 'fiction', price: 100, discountPrice: 90 },
//       { title: 'Book 2', author: 'Author 2', isbn: '124', date: '2021-01-01', genre: 'non-fiction', price: 150, discountPrice: 140 }
//     ];
    
//     //instead of making an actual HTTP request,it returns an observable emitting the mockBooks data.
//     spyOn(fetchService, 'getbooks').and.returnValue(of(mockBooks));    

//     component.ngOnInit();

//     expect(component.books.length).toBe(2);
//     expect(component.allBooks.length).toBe(2);
//   });

//   it('should search and filter books', () => {
//     component.allBooks = [
//       { title: 'Book 1', author: 'Author 1', isbn: '123', date: '2020-01-01', genre: 'fiction', price: 100, discountPrice: 90 },
//       { title: 'Book 2', author: 'Author 2', isbn: '124', date: '2021-01-01', genre: 'non-fiction', price: 150, discountPrice: 140 }
//     ];

//     component.searchValue = 'Book 1';
//     component.searchAndFilterBooks();

//     expect(component.books.length).toBe(1);
//     expect(component.books[0].title).toBe('Book 1');
//   });

//   it('should clear search and filter', () => {
//     component.allBooks = [
//       { title: 'Book 1', author: 'Author 1', isbn: '123', date: '2020-01-01', genre: 'fiction', price: 100, discountPrice: 90 },
//       { title: 'Book 2', author: 'Author 2', isbn: '124', date: '2021-01-01', genre: 'non-fiction', price: 150, discountPrice: 140 }
//     ];

//     component.searchValue = 'Book 1';
//     component.selectedGenre = 'fiction';
//     component.sortSelect = 'asc';
//     component.searchAndFilterBooks();

//     // Now clear the search and filter
//     component.clearBook();

//     expect(component.books.length).toBe(2); 
//     expect(component.searchValue).toBe('');
//     expect(component.selectedGenre).toBe('');
//     expect(component.sortSelect).toBe('');
//   });

//   it('should sort books by title in ascending order', () => {
//     component.books = [
//       { title: 'Book 2', author: 'Author 2', isbn: '124', date: '2021-01-01', genre: 'non-fiction', price: 150, discountPrice: 140 },
//       { title: 'Book 1', author: 'Author 1', isbn: '123', date: '2020-01-01', genre: 'fiction', price: 100, discountPrice: 90 }
//     ];

//     component.sortSelect = 'asc';
//     component.sortByTitle();

//     expect(component.books[0].title).toBe('Book 1');
//     expect(component.books[1].title).toBe('Book 2');
//   });

//   it('should sort books by title in descending order', () => {
//     component.books = [
//       { title: 'Book 2', author: 'Author 2', isbn: '124', date: '2021-01-01', genre: 'non-fiction', price: 150, discountPrice: 140 },
//       { title: 'Book 1', author: 'Author 1', isbn: '123', date: '2020-01-01', genre: 'fiction', price: 100, discountPrice: 90 }
//     ];

//     component.sortSelect = 'desc';
//     component.sortByTitle();

//     expect(component.books[0].title).toBe('Book 2');
//     expect(component.books[1].title).toBe('Book 1');
//   });

//   it('should navigate to add-book on edit', () => {
//     const mockBook = { title: 'Book 1', author: 'Author 1', isbn: '123', date: '2020-01-01', genre: 'fiction', price: 100, discountPrice: 90 };
//     spyOn(router, 'navigate');
//     component.editBook(mockBook, 0);
//     expect(router.navigate).toHaveBeenCalledWith(['/add-book']);
//   });

//   it('should delete a book', () => {
//     component.books = [
//       { title: 'Book 1', author: 'Author 1', isbn: '123', date: '2020-01-01', genre: 'fiction', price: 100, discountPrice: 90 }
//     ];
//     component.deleteBook(0);
//     expect(component.books.length).toBe(0);
//   });
//   it('should return formatted HTML for discounted price', () => {
//     const result = component.discountCalculation(200);
//     expect(result).toBeDefined(); 
//     expect(result).toBeTruthy(); 
//   });
  
//   it('should return formatted HTML for full price when there is no discount', () => {
//     const result = component.discountCalculation(200);
//     expect(result).toBeDefined();
//     expect(result).toBeTruthy();
//   });
  
//   it('should return formatted HTML with 0 rs/- when both actual and discount price are undefined', () => {
//     const result = component.discountCalculation(undefined);
//     expect(result).toBeDefined();
//     expect(result).toBeTruthy();
//   });
  
//   it('should correctly calculate book age in years', () => {
//     const result = component.calculateAge('2020-01-01');
//     expect(result).toContain('years ago'); 
//   });
  
//   it('should correctly calculate book age in months', () => {
//     const lastMonthDate = new Date();
//     lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
//     const formattedDate = lastMonthDate.toISOString().split('T')[0];
  
//     const result = component.calculateAge(formattedDate);
//     expect(result).toContain('months ago');
//   });
  
//   it('should correctly calculate book age in days', () => {
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     const formattedDate = yesterday.toISOString().split('T')[0];
  
//     const result = component.calculateAge(formattedDate);
//     expect(result).toContain('days ago'); 
//   });
  
// });