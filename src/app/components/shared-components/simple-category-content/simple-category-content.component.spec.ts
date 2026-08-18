import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCategoryContentComponent } from './simple-category-content.component';

describe('SimpleCategoryContentComponent', () => {
  let component: SimpleCategoryContentComponent;
  let fixture: ComponentFixture<SimpleCategoryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleCategoryContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleCategoryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
