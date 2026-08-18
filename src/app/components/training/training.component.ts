import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ApiMethod } from '../services/api-methods';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent {
  @Input() title: string = '';
  @Input() categoryEndpoint: string = '';

  data: any = {};
  categories: any[] = [];
  selectedCategory: any;
  categoryFiles: any[] = [];
  subCategories: any[] = [];

  selectedCategoryFile: string = '';
  selectedSubCategoryFile: string | null = null;
  showSubCategories: boolean = false;

  readonly tabId: number = 23;

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

    this.selectedSubCategoryFile = null;
    this.subCategories = [];

    this.getSubCategories(category.id);
    const mainFile = this.categoryFiles.find(file =>
      (!file.subCategory || !file.subCategory.nameAr.trim())
    );
    this.selectedCategoryFile = mainFile ? mainFile.fileUrl : '';
  }

  getSubCategories(categoryId: number): void {
    if (!categoryId) {
      this.subCategories = [];
      this.showSubCategories = false;
      return;
    }

    this.api.apiCall(`SubCategory/${categoryId}`, ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.subCategories = (res.data || []).map((sub: any) => ({
          ...sub,
          fileUrl: this.getFileForSubCategory(sub.id)
        }));
        this.showSubCategories = this.subCategories.length > 0;
      },
      error: () => {
        console.error('فشل تحميل التصنيفات الفرعية');
      }
    });
  }

  getFileForSubCategory(subCategoryId: number): string {
    const file = this.categoryFiles.find(f => f.subCategory && f.subCategory.id === subCategoryId);
    return file ? file.fileUrl : '';
  }

  selectedSubCategoryId: number | null = null;

  selectSubCategory(sub: any): void {
    this.selectedSubCategoryId = sub.id;  
    this.selectedSubCategoryFile = sub.fileUrl || '';
  }
  
}

