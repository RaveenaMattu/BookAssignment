import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksList } from './components/books-list/books-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BooksList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bookManagement');
}
