import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryData implements InMemoryDbService{
  createDb(){

    const allBooks = [
      {
        id: 1,
        title: 'Book Title',
        author: 'Book Author Name',
        description: 'Book Description - details',
        genre: 'Sci-Fi',
        year: 1992
      }
    ]
    return { allBooks };
  }
  genId(allBooks: any[]): number {
    return allBooks.length > 0 ? Math.max(...allBooks.map((b) => b.id + 1)) : 1;
  }
}
