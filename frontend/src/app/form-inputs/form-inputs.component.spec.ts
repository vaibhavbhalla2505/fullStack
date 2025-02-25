// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormInputsComponent } from './form-inputs.component';
// import { BookfetchService } from '../service/bookfetch.service';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterTestingModule } from '@angular/router/testing'; 
// import { Router } from '@angular/router'; 
// import { of } from 'rxjs';

// describe('FormInputsComponent', () => {
//   let component: FormInputsComponent;
//   let fixture: ComponentFixture<FormInputsComponent>;               //holds an instance but does not assign yet
//   let fetchService: BookfetchService;
//   let router: Router;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         HttpClientModule,
//         RouterTestingModule
//       ],
//       declarations:[FormInputsComponent],
//       providers: [BookfetchService],
//     }).compileComponents();                                        //async operation beacuse it compiles the component's template and styles.


//     fixture = TestBed.createComponent(FormInputsComponent);     //create and manage instance of component in testing environment 
//     component = fixture.componentInstance;                      //gives access to the FormInputsComponent instance, allowing you to test its properties and methods.
//     fetchService = TestBed.inject(BookfetchService);
//     router = TestBed.inject(Router);
//   });

//   it('should create the component', () => {
//     expect(component).toBeDefined();
//   });

//   it('should not show custom genre input when a standard genre is selected', () => {
//     component.book.genre = 'Fiction'; 
//     fixture.detectChanges();                      //ensures the UI reflects the changes

//     const customGenreInput = fixture.nativeElement.querySelector('input[name="customGenre"]');
//     expect(customGenreInput).toBeNull();         // Ensure input is not visible
//   });

//   it('should show custom genre input when "Other" is selected', () => {
//     component.book.genre = 'other';
//     component.addCustomGenre({ target: { value: 'other' } } as unknown as Event);
//     fixture.detectChanges();
    
//     const customGenreInput = fixture.nativeElement.querySelector('input[name="customGenre"]');
//     expect(customGenreInput).toBeTruthy(); // Ensure the input is shown
//   });

//   it('should initialize with default book values', () => {
//     expect(component.book.title).toBe('');
//     expect(component.book.author).toBe('');
//     expect(component.book.isbn).toBe('');
//     expect(component.book.genre).toBe('');
//     expect(component.book.date).toBe('');
//     expect(component.book.price).toBeUndefined();
//     expect(component.book.discountPrice).toBeUndefined();
//   });

//   it('should show an alert when any required field is missing or invalid', () => {
//     spyOn(window, 'alert');                            // spy allows you to track method calls and control the behavior of the method
  
//     // Missing title
//     component.book.title = '';
//     component.book.author = 'Author';
//     component.book.genre = 'Fiction';
//     component.book.date = '2024-01-01';
//     component.book.isbn = '1234567890123';
//     expect(component.onSubmit()).toBeFalse();
//     expect(window.alert).toHaveBeenCalledWith('Please fill the title of the book');
  
//     // Missing author
//     component.book.title = 'Test Book';
//     component.book.author = '';
//     expect(component.onSubmit()).toBeFalse();
//     expect(window.alert).toHaveBeenCalledWith('Please enter the author name');
  
//     // Missing genre
//     component.book.author = 'Author';
//     component.book.genre = '';
//     expect(component.onSubmit()).toBeFalse();
//     expect(window.alert).toHaveBeenCalledWith('Please select a genre');
  
//     // Custom genre required when 'Other' is selected
//     component.book.genre = 'other';
//     component.customGenre = '';
//     expect(component.onSubmit()).toBeFalse();
//     expect(window.alert).toHaveBeenCalledWith('Please enter a custom genre');
  
//     // Future date
//     component.book.genre = 'Fiction';
//     component.book.date = '2099-01-01';
//     expect(component.onSubmit()).toBeFalse();
//     expect(window.alert).toHaveBeenCalledWith('Please enter the correct date');
  
//     //Invalid ISBN
//     component.book.date = '2024-01-01'; 
//     component.book.isbn = '12345'; 

//     expect(component.onSubmit()).toBeFalse();
//     expect(window.alert).toHaveBeenCalledWith('Please enter a valid ISBN-13 number');
//   });
  
//   it('should submit the form when valid', () => {
//     spyOn(fetchService, 'addbook').and.stub();     //replacing original addbook method to prevent side effects 
//     spyOn(router, 'navigate'); 

//     component.book.title = 'Test Book';
//     component.book.author = 'Author';
//     component.book.genre = 'Fiction';
//     component.book.isbn = '1234567890123';
//     component.book.date = '2024-01-01';

//     expect(component.onSubmit()).toBeTrue();

//     expect(fetchService.addbook).toHaveBeenCalled();
//     expect(router.navigate).toHaveBeenCalledWith(['/book-details']);
//   });
// });