import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-basic-view',
  standalone: true,
  imports: [NavComponent, HeaderComponent, FooterComponent],
  templateUrl: './basic-view.component.html',
  styleUrl: './basic-view.component.css',
})
export class BasicViewComponent {}
