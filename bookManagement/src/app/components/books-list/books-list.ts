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
  sucessMessage = '';
  message = '';
  private bookService = inject(BookService);
  private messageService = inject(MessageService);
  private cdr = inject (ChangeDetectorRef);

  ngOnInit() {
    this.bookService.getBooks().subscribe(
      books => {
    this.books = books;       
        this.message = this.messageService.getMessage();
        setTimeout(() => {          
          this.message = '';
          this.cdr.markForCheck();
          }, 3000);
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