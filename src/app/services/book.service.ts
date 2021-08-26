import { Injectable } from '@angular/core';
import { Book } from '../models/book'
import { BOOKS } from '../models/books-mockup';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = BOOKS;

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('${environment.APIEndpoint/book}')
      .pipe(
        tap(_ => console.log('fetched books')),
        catchError(this.handleError<Book[]>('getbooks', []))
      );
  }
  AddSubscription(userId: Number, bookId: Number): Observable<any> {
    return this.http.post(`${environment.APIEndpoint}/Subscribe?`, { body: `${userId}/${bookId}` })
      .pipe(
        tap(_ => console.log('added subscription')),
        catchError(this.handleError<any>('addSubscription', []))
      );
  }
  UnSubscription(userId: Number, bookId: Number): Observable<any> {
    return this.http.post(`${environment.APIEndpoint}/UnSubscribe?`, { body: `${userId}/${bookId}` })
      .pipe(
        tap(_ => console.log('unSubscribed')),
        catchError(this.handleError<any>('unsubscribed', []))
      );
  }
  constructor(private http: HttpClient) {
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
