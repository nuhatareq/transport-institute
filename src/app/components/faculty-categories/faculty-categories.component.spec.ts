import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCategoriesComponent } from './faculty-categories.component';

describe('FacultyCategoriesComponent', () => {
  let component: FacultyCategoriesComponent;
  let fixture: ComponentFixture<FacultyCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
