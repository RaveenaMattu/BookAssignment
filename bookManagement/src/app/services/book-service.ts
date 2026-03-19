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
}
