import { Component, OnInit, inject, NgModule } from '@angular/core';
import { BookService, MessageService } from '../../services/book-service';
import { BookInterface } from '../../interface/BookInterface';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books-list.html',
  styleUrls: ['./books-list.css'],
})
export class BooksList implements OnInit {

  books: BookInterface[] = [];
  // successMessage = '';
  message = '';
  private bookService = inject(BookService);
  private messageService = inject(MessageService);
  private cdr = inject (ChangeDetectorRef);

ngOnInit() {
  // subscribe to books
  this.bookService.getBooks().subscribe(books => {
    this.books = books;
    this.cdr.detectChanges();
  });

  // subscribe to message
  this.messageService.message$.subscribe(msg => {
    this.message = msg;
    this.cdr.detectChanges();
  });
}
  trackById(index: number, book: BookInterface) {
    return book.id;
  }
  toggleFav(i: number) {
    const book = this.books[i];
    this.bookService.toggleFav(book.id);
  }
}