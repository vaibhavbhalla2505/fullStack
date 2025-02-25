import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map,of, tap,catchError,throwError } from 'rxjs';
import { Book } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class BookfetchService {
  private apiBooks:Book[] | null=null;
  private BookToEdit:Book | null = null;
  private bookIndex:number | null = null;

  private url="http://localhost:3000/api/v1"

  constructor(private http:HttpClient) { }

    getBooks(): Observable<Book[]> {
      return this.http.get<any>(`${this.url}/combine-book`).pipe(
        map((response) =>
          response.data.map((book: any) => ({
            title: book.title,
            author: book.Author.author,
            genre: book.Category.category, 
            isbn: book.isbn,
            publication_date: book.publication_date,
            price: parseFloat(book.price),
          }))
        )
      );
    }
    
  addBook(book:Book):Observable<Book>{
    return this.http.post<Book>(`${this.url}/create-book`,book).pipe(
      tap(()=>console.log("Book added")),
      catchError((error)=>{
        console.log("error occured",error);
        return throwError(()=>error);
      })
    );
  }
}
