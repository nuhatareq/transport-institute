import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultingProjectsComponent } from './consulting-projects.component';

describe('ConsultingProjectsComponent', () => {
  let component: ConsultingProjectsComponent;
  let fixture: ComponentFixture<ConsultingProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultingProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
