import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../../environments/environment';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-board-of-directors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-of-directors.component.html',
  providers: [MessageService],
  styleUrl: './board-of-directors.component.css'
})
export class BoardOfDirectorsComponent implements OnInit {
  list: any[] = [];
  imgUrl = environment.fileUrl;

  constructor(private api: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.api.apiCall('BoardofDirectors', 'GET').subscribe({
      next: (res: any) => {
        this.list = res;
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل البيانات'
        })
    });
  }
}
