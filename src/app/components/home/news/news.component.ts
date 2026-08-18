import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { ApiMethod } from '../../services/api-methods';
import { News } from './news.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  providers: [MessageService],
  styleUrl: './news.component.css'
})
export class NewsComponent {
  newsList: News[] = [];
  
  selectedFile: File | null = null;
  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.getAllNews();

  }

  getAllNews(): void {
    this.apiService.apiCall('News', ApiMethod.GET).subscribe({
      next: (res: any) => this.newsList = res,
      error: (err) => {
        console.error('Error fetching news:', err);
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء تحديث الأخبار' });
      }
    });
  }

  showAllNews(): void {
     //navigate to a page contains all fetched news
    this.router.navigate(['/all-news']);
  }
  
}
