import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteSectorsComponent } from './institute-sectors.component';

describe('InstituteSectorsComponent', () => {
  let component: InstituteSectorsComponent;
  let fixture: ComponentFixture<InstituteSectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituteSectorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
