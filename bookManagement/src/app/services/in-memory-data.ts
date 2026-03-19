import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryData implements InMemoryDbService{
  createDb(){

    const allBooks = [
      {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        description: 'A guide to writing clean, maintainable code.',
        genre: 'Programming',
        year: 2008
      },
      {
        id: 2,
        title: 'Atomic Habits',
        author: 'James Clear',
        description: 'Practical strategies for building good habits and breaking bad ones.',
        genre: 'Self Improvement',
        year: 2018
      },
      {
        id: 3,
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt & David Thomas',
        description: 'Tips and practices for becoming a better programmer.',
        genre: 'Programming',
        year: 1999
      },
      {
        id: 4,
        title: 'Deep Work',
        author: 'Cal Newport',
        description: 'Rules for focused success in a distracted world.',
        genre: 'Productivity',
        year: 2016
      },
      {
        id: 5,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        description: 'A philosophical story about following your dreams.',
        genre: 'Fiction',
        year: 1988
      },
      {
        id: 6,
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        description: 'Classic book on wealth-building mindset and success.',
        genre: 'Finance',
        year: 1937
      },
      {
        id: 7,
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        description: 'Comprehensive textbook on algorithms and data structures.',
        genre: 'Computer Science',
        year: 2009
      },
      {
        id: 8,
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        description: 'Lessons on money, investing, and financial independence.',
        genre: 'Finance',
        year: 1997
      }
    ];
    return { allBooks };
  }
  genId(allBooks: any[]): number {
    return allBooks.length > 0 ? Math.max(...allBooks.map((b) => b.id + 1)) : 1;
  }
}
