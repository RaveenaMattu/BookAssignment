import { Injectable, inject } from '@angular/core';
import { BookInterface } from '../interface/BookInterface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  private api = 'api/allBooks';
  private httpClient = inject (HttpClient);


  getBooks(): Observable<BookInterface[]> {
    return this.httpClient.get<BookInterface[]>(this.api);
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
