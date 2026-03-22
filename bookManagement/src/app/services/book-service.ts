import { Injectable, inject } from '@angular/core';
import { BookInterface } from '../interface/BookInterface';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  private api = 'api/allBooks';
  private httpClient = inject (HttpClient);
   public booksSubject = new BehaviorSubject<BookInterface[]>([]);
  books$ = this.booksSubject.asObservable(); // expose observable for components

  constructor() {
    this.loadBooks(); // initialize BehaviorSubject
  }
  loadBooks(): void {
    this.httpClient.get<BookInterface[]>(this.api)
      .subscribe({
        next: (books) => this.booksSubject.next(books),
        error: (err) => console.error('Error loading books', err)
      });
  }

 getBooks(): Observable<BookInterface[]> {
  return this.books$; // <-- this is the key
}
  viewBook(id:number): Observable<BookInterface> {
    return this.httpClient.get<BookInterface>(`${this.api}/${id}`);
  }
  deleteBook(id:number): Observable<void> {
    return this.httpClient.delete<void>(`${this.api}/${id}`);
  }
  addBook(book: BookInterface): Observable<BookInterface> {
    return this.httpClient.post<BookInterface>(`${this.api}`, book);
  }
    toggleFav(bookId: number): void {
    const books = this.booksSubject.getValue();
    const targetBook = books.find(b => b.id === bookId);
    if (targetBook) {
      targetBook.isFav = !targetBook.isFav;
      this.booksSubject.next([...books]); // emit updated array
    }
  }
}
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private message: string = '';

  setMessage(msg: string) {
    this.message = msg;
  }

  getMessage(): string {
    setTimeout(()=> {
      this.message = '';
    }, 3000);
    return this.message;
  }
}
