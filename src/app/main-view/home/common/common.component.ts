import { Component } from '@angular/core';
import { CardHomeComponent } from '../../../shared-components/card-home/card-home.component';

@Component({
  selector: 'app-common',
  standalone: true,
  imports: [CardHomeComponent],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css',
})
export class CommonComponent {
  links: Array<string> = [
    'خدمات الاحوال المدنية',
    'خدمات المرور',
    'خدمات الحج والعمرة',
    'خدمات الادلة الجنائية',
    'خدمات تصاريح العمل',
  ];
}
