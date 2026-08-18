import { Component, OnInit } from '@angular/core';
import { CardHomeComponent } from '../../shared-components/card-home/card-home.component';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';
import { ApiMethod } from '../../services/api-methods';
import { Service } from './services.model';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CardHomeComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css',
  providers: [MessageService],
})
export class ServicesSectionComponent implements OnInit {

  servicesList: Service[] = [];



  constructor(
    private apiService: ApiService,
    private messageService: MessageService
  ) {
  } 

  ngOnInit(): void {
    this.getAllServices();

  }

  getAllServices(): void {
    this.apiService.apiCall('Service', ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.servicesList = res;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل في تحميل الخدمات' });
      }
    });
  } 

  showAllServices() : void{
    //navigate to a page contains all fetched services
  }
}
