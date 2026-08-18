import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiMethod } from '../../services/api-methods';
import { ApiService } from '../../services/api.service';
import { Tab } from '../../../models/tab.model';
import { RouterModule } from '@angular/router'; 
import { TabsService } from '../../services/tabs.service';



@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [MessageService] 
})
export class NavComponent implements OnInit {

  tabList: Tab[] = [];

  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private tabService : TabsService
  ) {}

  ngOnInit(): void {
    this.getAllTabs();
  }

  getAllTabs(): void {
    this.api.apiCall('Tabs' , ApiMethod.GET).subscribe({
      next :(res : any)=>{
        this.tabList = res
      }
    })
  } 

  chooseSelectedTab(choosedTab : any){
    debugger
    localStorage.setItem('selectedTab' , JSON.stringify(choosedTab ))
    // this.tabService.setChoosedTab(choosedTab)
  }

  


  
  
 
  

}






