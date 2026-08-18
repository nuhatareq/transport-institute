
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ApiMethod } from '../../services/api-methods';

export interface News {
  id?: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image?: string;
}

@Component({
  selector: 'app-all-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-news.component.html',
  styleUrl: './all-news.component.css'
})
export class AllNewsComponent {
  newsList: News[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchAllNews();
  }

  fetchAllNews(): void {
    this.apiService.apiCall('News', ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.newsList = res;
      },
      error: (err) => {
        console.error('خطأ أثناء تحديث الأخبار:', err);
      }
    });
  }
}
