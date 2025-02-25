import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map,of, tap,catchError,throwError } from 'rxjs';
import { Book } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class BookfetchService {
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
  setEditBook(book:Book,i:number):void{
    this.BookToEdit=book;
    this.bookIndex=i;
  }
  getEditBook():Book | null{
    return this.BookToEdit;
  }
  updateBook(book:Book):Observable<Book>{
    return this.http.put<Book>(`${this.url}/update-book/${book.isbn}`,book).pipe(
      tap((response)=>console.log("Book updated",response)),
      catchError((error)=>{
        console.log("error occured",error);
        return throwError(()=>error);
      })
    );
  }
  deleteBook(book:Book):Observable<Book>{
    return this.http.delete<Book>(`${this.url}/delete-book/${Number(book.isbn)}`,{}).pipe(
      tap(()=>console.log("Book deleted")),
      catchError((error)=>{
        console.log("error occured",error);
        return throwError(()=>error);
      })
    );
  }
  clearEdit():void{
    this.BookToEdit=null;
    this.bookIndex=null;
  }
  getIndex():number | null{
    return this.bookIndex;
  }
}
