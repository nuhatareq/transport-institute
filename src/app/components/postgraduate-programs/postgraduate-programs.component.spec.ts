import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostgraduateProgramsComponent } from './postgraduate-programs.component';

describe('PostgraduateProgramsComponent', () => {
  let component: PostgraduateProgramsComponent;
  let fixture: ComponentFixture<PostgraduateProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostgraduateProgramsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostgraduateProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
