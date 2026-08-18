import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ApiMethod } from '../services/api-methods';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-postgraduate-programs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postgraduate-programs.component.html',
  styleUrls: ['./postgraduate-programs.component.css'],
})
export class PostgraduateProgramsComponent {
  @Input() title: string = '';
  @Input() categoryEndpoint: string = '';

  data: any = {};
  categories: any[] = [];
  selectedCategory: any;

  categoryContents: any[] = [];
  subCategories: any[] = [];

  selectedCategoryContent: string = '';
  selectedSubCategoryContent: string | null = null;
  selectedSubCategoryId: number | null = null;
  showSubCategories: boolean = false;

  readonly tabId: number = 22; 

  constructor(private api: ApiService) {}

  async ngOnInit(): Promise<void> {
    const localData = localStorage.getItem('selectedTab');
    this.data = JSON.parse(localData || '{}');

    if (!this.data?.id) {
      console.warn('selectedTab.id not found.');
      return;
    }

    this.categories = await this.getTabsCategories();
    this.categoryContents = await this.getCategoryContents();

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

  async getCategoryContents(): Promise<any[]> {
    try {
      const response: any = await firstValueFrom(
        this.api.apiCall(`CategoryContent/ByTab/${this.tabId}`, ApiMethod.GET)
      );
      return response || [];
    } catch (error) {
      console.log('Error getting category contents:', error);
      return [];
    }
  }

  setSelectedCategoryData(category: any): void {
    this.selectedCategory = { ...category };
    this.selectedSubCategoryContent = null;
    this.subCategories = [];
    this.selectedSubCategoryId = null;

    this.getSubCategories(category.id);

    const mainContent = this.categoryContents.find(content =>
      (!content.subCategory || !content.subCategory.nameAr.trim())
    );
    this.selectedCategoryContent = mainContent ? mainContent.contentAr : '';
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
          contentAr: this.getContentForSubCategory(sub.id)
        }));
        this.showSubCategories = this.subCategories.length > 0;
      },
      error: () => {
        console.error('فشل تحميل التصنيفات الفرعية');
      }
    });
  }

  getContentForSubCategory(subCategoryId: number): string {
    const content = this.categoryContents.find(c => c.subCategory && c.subCategory.id === subCategoryId);
    return content ? content.contentAr : '';
  }

  selectSubCategory(sub: any): void {
    this.selectedSubCategoryId = sub.id;
    this.selectedSubCategoryContent = sub.contentAr || '';
  }
}
