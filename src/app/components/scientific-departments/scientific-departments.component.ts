import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { ApiService } from '../services/api.service';
import { TabsService } from '../services/tabs.service';
import { ApiMethod } from '../services/api-methods';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-scientific-departments',
  standalone: true,
  imports: [FormsModule, EditorModule],
  templateUrl: './scientific-departments.component.html',
  styleUrl: './scientific-departments.component.css',
})
export class ScientificDepartmentsComponent implements OnInit {
  categories: any[] = [];
  data: any = {};
  selectedCategory: any;
  categoryData: any = {};

  constructor(private api: ApiService, private tabService: TabsService) {}

  async ngOnInit(): Promise<void> {
    const localData = localStorage.getItem('selectedTab');
    this.data = JSON.parse(localData || '{}');

    if (!this.data?.id) {
      console.warn(' selectedTab.id not found.');
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
      const response: any = await firstValueFrom(
        this.api.apiCall(`Tabs/${this.data.id}`, ApiMethod.GET)
      );
      return response.data.categories || [];
    } catch (error) {
      console.log('there is an error occured' , error)
      return [];
    }
  }

  async setSelectedCategoryData(category: any): Promise<void> {
    this.selectedCategory = category;
    this.categoryData = await this.getCategoryDetails(category.id);
    console.log('categoryData:', this.categoryData);
  }

//  here is the function needed that takes the category id and fetch the data based on the choosed category 
  async getCategoryDetails(categoryId : any) : Promise<any>{
    try{
      console.log('Getting details for category ID:', categoryId); 
      let response : any = []
       response = await firstValueFrom (this.api.apiCall(`Categories/${categoryId}` , ApiMethod.GET) )
       console.log('Returned category data:', response.data);
       return response;
    } 
    catch(error : any){
      console.log('there is an error occured' , error)
    }
  }
  baseUrl = 'http://10.4.30.8:5516/';  

  getImageUrl(relativePath: string | undefined): string {
    if (!relativePath) {
      return 'https://placehold.co/600x400/EEE/31343C'; 
    }
    return this.baseUrl + relativePath;
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://placehold.co/600x400/EEE/31343C'; 
  }


  

  
}



