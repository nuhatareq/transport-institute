import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

 choosedTab: any = {}
  constructor() { }  

  setChoosedTab(choosedTab : any) : void {
    debugger
    this.choosedTab = choosedTab
  }  

  getChoosedTab() : any{
    debugger
    return this.choosedTab
  }



}
