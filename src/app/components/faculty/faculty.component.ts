// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { ApiService } from '../services/api.service';
// import { ApiMethod } from '../services/api-methods';

// @Component({
//   selector: 'app-faculty',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './faculty.component.html',
//   styleUrls: ['./faculty.component.scss']
// })
// export class FacultyComponent implements OnInit {
//   facultyList: any[] = [];

//   constructor(
//     private apiService: ApiService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.getAllFaculty();
//   }

//   getAllFaculty(): void {
//     this.apiService.apiCall('FacultyMember', ApiMethod.GET).subscribe({
//       next: (res: any) => this.facultyList = res,
//       error: (err) => {
//         console.error('Error fetching faculty:', err);
//       }
//     });
//   }

//   goToDetails(id: number): void {
//     this.router.navigate(['/faculty', id]);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ApiMethod } from '../services/api-methods';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
  facultyList: any[] = [];
  categoryId!: number;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = +params['categoryId'] || 0;
      if (this.categoryId) {
        this.getFacultyByCategory(this.categoryId);
      }
    });
  }

  getFacultyByCategory(categoryId: number): void {
    this.apiService.apiCall(`FacultyMember/ByCategory/${categoryId}`, ApiMethod.GET).subscribe({
      next: (res: any) => {
        this.facultyList = res?.data || []; 
      },
      error: (err) => console.error('Error fetching faculty:', err)
    });
  }
  

  goToDetails(id: number): void {
    this.router.navigate(['/faculty', id]);
  }
}
