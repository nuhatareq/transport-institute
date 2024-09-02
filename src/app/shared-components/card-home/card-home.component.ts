import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-card-home',
  standalone: true,
  imports: [],
  templateUrl: './card-home.component.html',
  styleUrl: './card-home.component.css',
})
export class CardHomeComponent {
  @Input('card_title') card_title = '';
}
