import { Component } from '@angular/core';
import { SharedComponentsComponent } from '../../../shared-components/shared-components.component';
import { CardHomeComponent } from '../../../shared-components/card-home/card-home.component';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CardHomeComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css',
})
export class ServicesSectionComponent {}
