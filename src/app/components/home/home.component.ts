import { Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { WelcomeSectionComponent } from './welcome-section/welcome-section.component';
import { NewsComponent } from './news/news.component';
import { CommonComponent } from './common/common.component';
import { ServicesSectionComponent } from './services-section/services-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    WelcomeSectionComponent,
    NewsComponent,
    CommonComponent,
    ServicesSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
