import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book-service';
import { BookInterface } from '../../interface/BookInterface';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail {

  books: BookInterface[] = [];
  private bookService = inject (BookService);
  private cdr = inject (ChangeDetectorRef);
  selectedBook: BookInterface | null = null;
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // const book = this.books.find((b) => b.id === id);
    
    // if(book) {
    //   this.selectedBook = book;
    // }

    this.bookService.viewBook(id).subscribe({
      next: (data) => {
        this.selectedBook = data;
        this.cdr.detectChanges();
        console.log(data);
      },
      error: (err) => {
        console.log('Error loading book details', err);
      }
    });
  }
}
