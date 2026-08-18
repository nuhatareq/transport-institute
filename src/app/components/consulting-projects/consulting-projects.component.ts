import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ApiMethod } from '../services/api-methods';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-consulting-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consulting-projects.component.html',
  styleUrls: ['./consulting-projects.component.css'],
})
export class ConsultingProjectsComponent {
  
  @Input() title: string = '';
  @Input() categoryEndpoint: string = '';

  data: any = {};
  categories: any[] = [];
  selectedCategory: any;
  categoryFiles: any[] = [];
  readonly tabId: number = 24; 

  constructor(private api: ApiService) {}

  async ngOnInit(): Promise<void> {
    const localData = localStorage.getItem('selectedTab');
    this.data = JSON.parse(localData || '{}');

    if (!this.data?.id) {
      console.warn('selectedTab.id not found.');
      return;
    }

    this.categories = await this.getTabsCategories();
    this.categoryFiles = await this.getCategoryFiles();

    if (this.categories?.length) {
      this.setSelectedCategoryData(this.categories[0]);
    }
  }

  async getTabsCategories(): Promise<any[]> {
    try {
      const response: any = await firstValueFrom(
        this.api.apiCall(`Tabs/${this.data.id}`, ApiMethod.GET)
      );
      return response.data.categories || [];
    } catch (error) {
      console.log('Error getting categories:', error);
      return [];
    }
  }

  async getCategoryFiles(): Promise<any[]> {
    try {
      const response: any = await firstValueFrom(
        this.api.apiCall(`CategoryContent/ByTab/${this.tabId}`, ApiMethod.GET)
      );
      return response.map((item: any) => ({
        ...item,
        fileUrl: item.file ? `${environment.fileUrl}/${item.file}` : ''
      }));
    } catch (error) {
      console.log('Error getting category files:', error);
      return [];
    }
  }

  setSelectedCategoryData(category: any): void {
    this.selectedCategory = { ...category }; 
  
    this.api.apiCall(`Categories/${category.id}`, ApiMethod.GET).subscribe({
      next: (res: any) => {
        if (res?.categoryContents?.length) {
          const filePath = res.categoryContents[0].file;
          this.selectedCategory.fileUrl = `${environment.fileUrl}${filePath}`;
        } else {
          this.selectedCategory.fileUrl = '';
        }
  
        console.log('Selected Category:', this.selectedCategory);
      },
      error: (err) => {
        console.error('Error fetching category details:', err);
        this.selectedCategory.fileUrl = '';
      }
    });
  }
  
  
}
