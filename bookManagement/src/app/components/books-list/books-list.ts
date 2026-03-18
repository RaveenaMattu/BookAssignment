import { Component, OnInit, inject, NgModule } from '@angular/core';
import { BookService } from '../../services/book-service';
import { BookInterface } from '../../interface/BookInterface';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-list.html',
  styleUrls: ['./books-list.css'],
})
export class BooksList implements OnInit {

  books: BookInterface[] = [];
  private bookService = inject(BookService);
  private cdr = inject (ChangeDetectorRef);

  ngOnInit() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
        console.log(data);
      },
      error: (err) => {
        console.log('Error loading books', err);
      }
    });
  }
  trackById(index: number, book: BookInterface) {
  return book.id;
  }
}