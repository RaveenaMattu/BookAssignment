import { Routes } from '@angular/router';
import { BooksList } from './components/books-list/books-list';
import { BookDetail } from './components/book-detail/book-detail';

export const routes: Routes = [
  { path: 'allBooks', component: BooksList},
  { path: 'allBooks/:id', component: BookDetail},
  { path: '**', redirectTo: 'allBooks' }
];
