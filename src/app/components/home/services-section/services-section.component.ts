import { Component } from '@angular/core';
import { CardHomeComponent } from '../../shared-components/card-home/card-home.component';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CardHomeComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css',
})
export class ServicesSectionComponent {}
