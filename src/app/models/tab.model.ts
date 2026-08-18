
export interface Tab {
    id?: number;
    nameAr: string;
    nameEn: string;
       url?: string; 
    descriptionAr: string;
    descriptionEn: string;
    createdAt?: string;
    modifiedAt?: string; 
    tabCategories : Categories[]

  } 


  export interface Categories { 
    id?:number; 
    nameAr ?:string; 
    nameEn?:string;
  }
  
 
  