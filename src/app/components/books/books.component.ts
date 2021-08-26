import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  loggedInUserID = 1;
  books: Book[] = [];
  selectedBook?: Book;
  response = "";
  onBookSelect(book: Book): void {
    this.selectedBook = book;
  }
  Subscribe(bookId: number) {
    this.bookService.AddSubscription(this.loggedInUserID, bookId).subscribe(response => this.response = response);
  }
  UnSubscribe(bookId: number): void {
    this.bookService.UnSubscription(this.loggedInUserID, bookId).subscribe(response => this.response = response);
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }
}
