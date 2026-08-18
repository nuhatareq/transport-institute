import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ApiMethod } from '../services/api-methods';

interface ContactUs {
  telephoneAndFax: string;
  email: string;
  facebookPage: string;
  postalAddress: string;
}

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactData: ContactUs | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this.apiService.apiCall('ContactUs', ApiMethod.GET).subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
          this.contactData = res[0]; 
        }
      },
      error: (err) => {
        console.error('Error fetching contact data:', err);
      }
    });
  }
}
