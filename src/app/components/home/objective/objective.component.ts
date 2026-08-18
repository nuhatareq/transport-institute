import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { ApiMethod } from '../../services/api-methods';
@Component({
  selector: 'app-objective',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './objective.component.html',
  providers: [MessageService],
  styleUrl: './objective.component.css'
  
})
export class ObjectiveComponent {
  objectiveList: any[] = [];

  constructor(
    private api: ApiService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllObjectives();
  }

  getAllObjectives(): void {
    this.api.apiCall('Objective', ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.objectiveList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل الأهداف'
        });
      }
    });
  }

  
}
