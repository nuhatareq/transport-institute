import { Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { WelcomeSectionComponent } from './welcome-section/welcome-section.component';
import { NewsComponent } from './news/news.component';
import { CommonComponent } from './common/common.component';
import { BoardOfDirectorsComponent } from './board-of-directors/board-of-directors.component';
import { ObjectiveComponent } from './objective/objective.component';
import { StrategyComponent } from './strategy/strategy.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    WelcomeSectionComponent,
    BoardOfDirectorsComponent,
    AboutComponent,
    ObjectiveComponent,
    StrategyComponent,
    NewsComponent,
    CommonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
