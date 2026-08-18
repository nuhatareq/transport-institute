import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';
import { ApiMethod } from '../../services/api-methods';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  providers: [MessageService],
  styleUrl: './about.component.css'
})
export class AboutComponent {
  visionList: any[] = [];
  ourVision : any = { image : ''} 
  ourMessage : any = { image : ''}

  public readonly imgUrl = environment.fileUrl
  
  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
   
  ) {
   
  }

  ngOnInit(): void {
    this.getVisionList();

  }

  getVisionList(): void {
    this.apiService.apiCall('HomeVisionSection', ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.visionList = res; 
        this.ourVision = res[0]; 
        this.ourVision.image = this.imgUrl + res[0].image
        this.ourMessage = res[1] 
        this.ourMessage.image = this.imgUrl + res[1].image
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل في تحميل البيانات' });
      }
    });
  }


}
