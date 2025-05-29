import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificDepartmentsComponent } from './scientific-departments.component';

describe('ScientificDepartmentsComponent', () => {
  let component: ScientificDepartmentsComponent;
  let fixture: ComponentFixture<ScientificDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScientificDepartmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScientificDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
