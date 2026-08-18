import { Component, OnInit } from '@angular/core';
import { TabsService } from '../services/tabs.service';
import { ApiService } from '../services/api.service';
import { ApiMethod } from '../services/api-methods';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { DatePipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-about-institute',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor],
  templateUrl: './about-institute.component.html',
  providers: [MessageService],
  styleUrls: ['./about-institute.component.css'],
})
export class AboutInstituteComponent implements OnInit {
  categories: any[] = []; 
  data : any = {};
  selectedCategory : any= { image : ''} 
  categoryData : any = {}
  visionList: any[] = [];
  ourVision: any = { image: '' };
  ourMessage: any = { image: '' };
  orgStructure: any = { image: '' };
  aboutInstitute: any[] = [];
  leadersList: any[] = [];
  decisionList: any[] = [];

  public readonly imgUrl = environment.fileUrl

  constructor(private api: ApiService , private tabService : TabsService ,private messageService: MessageService
    ) { }

  async ngOnInit(): Promise<any> {
    this.data = JSON.parse(localStorage.getItem('selectedTab') || '');
    this.categories = await this.getTabsCategories();
    this.selectedCategory = this.categories[0];
    this.getVisionList();
    this.getOrgStructure();
    this.getAboutInstitute();
    this.getInstituteLeaders();
    this.getAllDecisions();
  }
  

  async getTabsCategories(): Promise<any> {
    try{
      let response : any = []
       response = await firstValueFrom (this.api.apiCall(`Tabs/${this.data.id}` , ApiMethod.GET) )
      return response.data.categories
    } 
    catch(error : any){
      console.log('there is an error occured' , error)
    }
  } 

  async setSelectedCategoryData(category : any) : Promise<void> {
    this.selectedCategory = category; 
   

  }

  getVisionList(): void {
    this.api.apiCall('HomeVisionSection', ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.visionList = res;
        if (res.length >= 2) {
          this.ourVision = res[0];
          this.ourVision.image = this.imgUrl + res[0].image;
          this.ourMessage = res[1];
          this.ourMessage.image = this.imgUrl + res[1].image;
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل في تحميل الرؤية والرسالة' });
      }
    });
  }

  getOrgStructure(): void {
    this.api.apiCall('OrganizationalStructure', ApiMethod.GET).subscribe({
      next: (res: any) => {
        if (res.length) {
          this.orgStructure = res[0];
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل في تحميل الهيكل التنظيمي' });
      }
    });
  }

  getAboutInstitute(): void {
    this.api.apiCall('AboutTheInstitute', ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.aboutInstitute = res;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل في تحميل بيانات عن المعهد' });
      }
    });
  }

  getInstituteLeaders(): void {
    this.api.apiCall('InstituteLeaders', ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.leadersList = res;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل في تحميل بيانات قيادات المعهد' });
      }
    });
  }

  getAllDecisions(): void {
    this.api.apiCall('MinisterialDecision', ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.decisionList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل القرارات الوزارية'
        });
      }
    });
  }
 
}
