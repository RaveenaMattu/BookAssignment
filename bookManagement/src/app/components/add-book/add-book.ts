import { Component, inject, OnInit } from '@angular/core';
import { BookInterface } from '../../interface/BookInterface';
import { BookService, MessageService } from '../../services/book-service';
import { RouterModule, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
})
export class AddBook {

  books: BookInterface[] = [];
  private bookService = inject (BookService);
  private router = inject (Router);
  private successMessage = inject (MessageService);

  years: number[] = [];

  // newBook: BookInterface = {
  //   id: 0,
  //   title: '',
  //   author: '',
  //   description: '',
  //   genre: '',
  //   year: 0
  // };

    ngOnInit() {
      this.bookService.getBooks().subscribe(data => {
        this.books = data;
      });

      const currentYear = new Date().getFullYear();
      for (let i = currentYear; i >= 1900; i--) {
        this.years.push(i);
      }
    }

  bookForm = new FormGroup<{
    title: FormControl<string>;
    author: FormControl<string>;
    description: FormControl<string>;
    genre: FormControl<string>;
    image: FormControl<string>;
    year: FormControl<number>;
  }>({
    title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    author: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    description: new FormControl('', { validators: [Validators.required, Validators.minLength(10)], nonNullable: true }),
    genre: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    image: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    year: new FormControl(0, { validators: [Validators.required, Validators.min(0)], nonNullable: true }),
  });

  addNewBook() {
    const id = this.books.length > 0 
      ? Math.max(...this.books.map(b => b.id)) + 1
      : 1;

    // Create a new book from form values
    const newBook: BookInterface = {
      id: id,
      title: this.bookForm.controls.title.value,
      author: this.bookForm.controls.author.value,
      description: this.bookForm.controls.description.value,
      genre: this.bookForm.controls.genre.value,
      year: this.bookForm.controls.year.value,
      image : this.bookForm.controls.image.value,
      isFav: false
    
    };

    // Call the service
    this.bookService.addBook(newBook).subscribe({
      next: (book) => {
        this.books.push(book);       
        this.router.navigate(['/allBooks']);   // navigate to the list
        this.successMessage.setMessage ('Book added successfully!!');
      },
      error: (err) => console.error('Error adding book:', err)
    });
  }
}

