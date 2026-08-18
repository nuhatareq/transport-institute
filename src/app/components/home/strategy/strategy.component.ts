import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ApiMethod } from '../../services/api-methods';


@Component({
  selector: 'app-strategy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './strategy.component.html',
  styleUrl: './strategy.component.css'
})
export class StrategyComponent implements OnInit {
  strategyList: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getStrategyList();
  }

  getStrategyList(): void {
    this.apiService.apiCall('Strategy', ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.strategyList = res;
      },
      error: () => {
        console.error('فشل في تحميل الاستراتيجيات');
      }
    });
  }
}
