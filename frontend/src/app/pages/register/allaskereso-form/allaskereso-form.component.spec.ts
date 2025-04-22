import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllaskeresoFormComponent } from './allaskereso-form.component';

describe('AllaskeresoFormComponent', () => {
  let component: AllaskeresoFormComponent;
  let fixture: ComponentFixture<AllaskeresoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllaskeresoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllaskeresoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
