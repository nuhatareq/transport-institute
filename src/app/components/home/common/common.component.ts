import { Component } from '@angular/core';
import { CardHomeComponent } from '../../shared-components/card-home/card-home.component';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';
import { ApiMethod } from '../../services/api-methods';

@Component({
  selector: 'app-common',
  standalone: true,
  imports: [CardHomeComponent],
  templateUrl: './common.component.html',
  providers: [MessageService],
  styleUrl: './common.component.css',
})
export class CommonComponent {
  
  sitesList: any[] = [];


  constructor( private apiService: ApiService, private messageService: MessageService) {
  
  
  }

  ngOnInit(): void {
    this.getAllSites();

  }

  getAllSites(): void {
    this.apiService.apiCall('RelatedSite', ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.sitesList = res;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء تحميل المواقع' });
      }
    });
  }









}
