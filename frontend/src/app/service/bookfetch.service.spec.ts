// import { TestBed } from '@angular/core/testing';
// import { BookfetchService } from './bookfetch.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { Book } from '../app.component';

// describe('BookfetchService', () => {
//   let fetchService: BookfetchService;
//   let httpController: HttpTestingController;   

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],   //mock HTTP requests without actually hitting an API.
//       providers: [BookfetchService],
//     });

//     fetchService = TestBed.inject(BookfetchService);
//     httpController = TestBed.inject(HttpTestingController);
//   });

//   it('fetch service created', () => {
//     expect(fetchService).toBeDefined();
//   });

//   it('should fetch books from the API', () => {
//     const mockBooks: Book[] = [
//       {
//         title: 'Test Book',
//         author: 'Test Author',
//         isbn: '1234567890123',
//         genre: 'fiction',
//         date: '2023-01-01',
//         price: 20,
//         discountPrice: 15,
//       },
//     ];

//     fetchService.getbooks().subscribe((books) => {
//       expect(books.length).toBe(1);
//       expect(books[0].title).toBe('Test Book');
//     });

    
//     const req = httpController.expectOne(fetchService['url']);      
//     expect(req.request.method).toBe('GET');
//     req.flush({ items: [                                      //send a fake response back to the server
//       {
//         volumeInfo: {
//           title: 'Test Book',
//           authors: ['Test Author'],
//           categories: ['Fiction'],
//           industryIdentifiers: [{ identifier: '1234567890123' }],
//           publishedDate: '2023-01-01',
//         },
//         saleInfo: {
//           listPrice: { amount: 20 },
//           retailPrice: { amount: 15 },
//         },
//       },
//     ] });
//   });

//   it('should add a book to apiBooks', () => {
//     const testBook: Book = {
//       title: 'New Book',
//       author: 'New Author',
//       isbn: '9876543210123',
//       genre: 'non-fiction',
//       date: '2024-02-01',
//       price: 25,
//       discountPrice: 20,
//     };
  
//     fetchService['apiBooks'] = [];
  
//     fetchService.addbook(testBook);
  
//     expect(fetchService['apiBooks'].length).toBe(1);
//     expect(fetchService['apiBooks'][0]).toEqual(testBook);
//   });
  
//   it('should handle empty API response', () => {
//     fetchService.getbooks().subscribe((books) => {
//       expect(books.length).toBe(0);
//     });

//     const req = httpController.expectOne(fetchService['url']);
//     req.flush({ items: [] });
//   });
// });