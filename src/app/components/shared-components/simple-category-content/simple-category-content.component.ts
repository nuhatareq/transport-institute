import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { ApiService } from '../../services/api.service';
import { ApiMethod } from '../../services/api-methods';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-simple-category-content',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule],
  templateUrl: './simple-category-content.component.html',
  styleUrls: ['./simple-category-content.component.css'],
})
export class SimpleCategoryContentComponent implements OnInit {
  @Input() title: string = '';
  @Input() categoryEndpoint: string = '';

  data: any = {};
  categories: any[] = [];
  selectedCategory: any;
  categoryData: any = {};

  constructor(private api: ApiService) {}

  async ngOnInit(): Promise<void> {
    const localData = localStorage.getItem('selectedTab');
    this.data = JSON.parse(localData || '{}');

    if (!this.data?.id) {
      console.warn('selectedTab.id not found.');
      return;
    }

    this.categories = await this.getTabsCategories();

    if (this.categories?.length) {
      this.selectedCategory = this.categories[0];
      this.categoryData = await this.getCategoryDetails(this.selectedCategory.id);
    }
  }

  async getTabsCategories(): Promise<any[]> {
    try {
      debugger
      const response: any = await firstValueFrom(
        this.api.apiCall(`Tabs/${this.data.id}`, ApiMethod.GET)
      );
      return response.data.categories || [];
    } catch (error) {
      console.log('Error getting categories:', error);
      return [];
    }
  }

  async setSelectedCategoryData(category: any): Promise<void> {
    debugger
    console.log(category)
    this.selectedCategory = category;
    this.categoryData = await this.getCategoryDetails(category.id);
  }

  //  here is the function needed that takes the category id and fetch the data based on the choosed category 

  async getCategoryDetails(categoryId: any): Promise<any> {
    try {
      const response: any = await firstValueFrom(
        this.api.apiCall(`Categories/${categoryId}`, ApiMethod.GET)
      );
      return response.categoryContents;
    }
     catch (error) {
      console.log('Error getting category details:', error);
    }
  }
  
}

