import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { BookService, MessageService } from '../../services/book-service';
import { BookInterface } from '../../interface/BookInterface';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css'], // fix: use styleUrls (plural)
})
export class BookDetail implements OnInit {

  book!: BookInterface;
  private bookService = inject(BookService);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  deleteMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Subscribe to BehaviorSubject to get the latest book data
    this.bookService.books$.subscribe(books => {
      const b = books.find(b => b.id === id);
      if (b) {
        this.book = b;
        this.cdr.detectChanges(); // ensures template updates
      }
    });
  }

  toggleFav() {
    if (this.book) {
      this.bookService.toggleFav(this.book.id);
    }
  }

  setDeleteMessage(msg: string) {
    this.deleteMessage = msg;
    setTimeout(() => {
      this.deleteMessage = '';
      this.cdr.detectChanges();
    }, 3000);
  }

  deleteBook() {
    if (!this.book) return;
    if (!confirm('Are you sure you want to delete this book?')) return;

    const id = this.book.id;
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.messageService.setMessage('Book deleted successfully');
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error deleting book', err),
    });
  }
}