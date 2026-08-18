import { Component } from '@angular/core';
import { ApiMethod } from '../../services/api-methods';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-welcome-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-section.component.html',
  styleUrl: './welcome-section.component.css',
  providers: [MessageService],
})
export class WelcomeSectionComponent {
  heroList: any[] = [];

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getHeroData();
  }

  getHeroData(): void {
    this.apiService.apiCall('Hero', ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.heroList = res;
        
        setTimeout(() => {
          const el = document.querySelector('#heroCarousel');
          if (el) {
            // @ts-ignore
            new bootstrap.Carousel(el, {
              interval: 3000,
              ride: 'carousel',
              pause: false,
              wrap: true
            });
          }
        }, 100); 

      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل في تحميل البيانات' });
      }
    });
  }

  
 
}
