import { Component } from '@angular/core';
import { HeaderComponent } from './basic-view/header/header.component';
import { NavComponent } from './basic-view/nav/nav.component';
import { FooterComponent } from './basic-view/footer/footer.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [HeaderComponent, NavComponent, FooterComponent, HomeComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css',
})
export class MainViewComponent {}
