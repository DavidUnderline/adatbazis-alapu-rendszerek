import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllaskeresoJobsComponent } from './allaskereso-jobs.component';

describe('AllaskeresoJobsComponent', () => {
  let component: AllaskeresoJobsComponent;
  let fixture: ComponentFixture<AllaskeresoJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllaskeresoJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllaskeresoJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
