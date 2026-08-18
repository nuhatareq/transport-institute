import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ApiMethod } from '../services/api-methods';

@Component({
  selector: 'app-faculty-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-categories.component.html',
  styleUrls: ['./faculty-categories.component.scss']
})
export class FacultyCategoriesComponent implements OnInit {
  categories: any[] = [];
  readonly tabId: number = 26;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getCategories();
  }

  async getCategories(): Promise<void> {
    try {
      const response: any = await this.apiService.apiCall(`Tabs/${this.tabId}`, ApiMethod.GET).toPromise();
      this.categories = response?.data?.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  goToFacultyMembers(categoryId: number): void {
    this.router.navigate(['/faculty'], { queryParams: { categoryId } });
  }
}

