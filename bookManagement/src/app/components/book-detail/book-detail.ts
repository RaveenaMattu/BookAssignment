import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { BookService, MessageService } from '../../services/book-service';
import { BookInterface } from '../../interface/BookInterface';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css'],
})
export class BookDetail implements OnInit {

  book!: BookInterface;
  books: BookInterface[] = [];
  private bookService = inject(BookService);
  private deleteMessage = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Subscribe to BehaviorSubject to get the latest book data
    this.bookService.books$.subscribe(books => {
      const b = books.find(b => b.id === id);
      if (b) {
        this.book = b;
        this.cdr.detectChanges(); 
      }
    });
  }

  toggleFav() {
    if (this.book) {
      this.bookService.toggleFav(this.book.id);
    }
  }

  //  deleteBook() {
  //   alert('Are you sure you want to delete this book?');
  //   const id = Number(this.route.snapshot.paramMap.get('id'));

  //   const book = this.books.filter((b) => b.id !== id);
  //   this.bookService.deleteBook(id).subscribe({
  //     next: () => {
  //       this.books = book;
  //       this.messageService.setMessage('Book deleted successfully');
  //       this.cdr.detectChanges();
  //     },
  //     error: (err) => {
  //       console.log('Error deleting book', err)
  //     }
  //   });
    
  // }

deleteBook() {
  if (!confirm('Are you sure you want to delete this book?')) return;

  const id = this.book.id;

  this.bookService.deleteBook(id).subscribe({
    next: () => {
      // update BehaviorSubject
      const updatedBooks = this.bookService.booksSubject.getValue()
        .filter(b => b.id !== id);
      this.bookService.booksSubject.next(updatedBooks);

      // set message using reactive service
      this.deleteMessage.setMessage('Book deleted successfully');

      this.router.navigate(['/allBooks']);
    },
    error: (err) => console.error('Error deleting book', err)
  });
}
  
}