import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegyeCountJobsComponent } from './megye-count-jobs.component';

describe('MegyeCountJobsComponent', () => {
  let component: MegyeCountJobsComponent;
  let fixture: ComponentFixture<MegyeCountJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegyeCountJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MegyeCountJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
