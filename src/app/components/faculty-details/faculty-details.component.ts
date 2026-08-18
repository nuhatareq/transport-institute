import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ApiMethod } from '../services/api-methods';

@Component({
  selector: 'app-faculty-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-details.component.html',
  styleUrls: ['./faculty-details.component.scss']
})
export class FacultyDetailsComponent implements OnInit {
  faculty: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.apiCall(`FacultyMember/${id}`, ApiMethod.GET).subscribe({
        next: (res: any) => this.faculty = res,
        error: (err: any) => console.error(err)
      });
    }
  }
}
