import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ApiMethod } from '../services/api-methods';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})

export class LibraryComponent implements OnInit {
  allBooks: any[] = [];
  books: any[] = [];
  selectedCategory: 'arabic' | 'foreign' = 'arabic';
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  pagesToShow: number[] = [];

  constructor(private api: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllBooks();
    this.filterBooks();
  }

  async getAllBooks(): Promise<void> {
    try {
      const response: any = await firstValueFrom(this.api.apiCall(`Book`, ApiMethod.GET));
      this.allBooks = response || [];
    } catch (error) {
      console.error('Error fetching books:', error);
      this.allBooks = [];
    }
  }

  setSelectedCategory(category: 'arabic' | 'foreign'): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.filterBooks();
  }

  filterBooks(): void {
    let filtered = [];
    if (this.selectedCategory === 'arabic') {
      filtered = this.allBooks.filter(book => book.isArabicBook === true);
    } else {
      filtered = this.allBooks.filter(book => book.isArabicBook === false);
    }

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    this.updatePages();
    this.books = this.getPaginatedBooks(filtered);
  }

  getPaginatedBooks(list: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return list.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePages();
    this.filterBooks();
  }

  
  updatePages(): void {
    const maxVisible = 5; 
    const pages: number[] = [];

    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(this.currentPage - 2, 1);
      let end = start + maxVisible - 1;

      if (end > this.totalPages) {
        end = this.totalPages;
        start = end - maxVisible + 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    this.pagesToShow = pages;
  }
}

