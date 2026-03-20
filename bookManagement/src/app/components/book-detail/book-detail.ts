import { Component, inject, OnInit } from '@angular/core';
import { BookService, MessageService } from '../../services/book-service';
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
export class BookDetail implements OnInit{

  books: BookInterface[] = [];
  private bookService = inject (BookService);
  private messageService = inject (MessageService);
  private cdr = inject (ChangeDetectorRef);
  selectedBook: BookInterface | null = null;
  private route = inject(ActivatedRoute);

  deleteMessage = '';

  setDeleteMessage(msg:string) {
    this.deleteMessage = msg;
    setTimeout(() => {
      this.deleteMessage= '';
      this.cdr.detectChanges();
    }, 3000);
  }

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
  deleteBook() {
    alert('Are you sure you want to delete this book?');
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const book = this.books.filter((b) => b.id !== id);
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = book;
        this.messageService.setMessage('Book deleted successfully');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error deleting book', err)
      }
    });
    
  }
}
