import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CegFormComponent } from './ceg-form.component';

describe('CegFormComponent', () => {
  let component: CegFormComponent;
  let fixture: ComponentFixture<CegFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CegFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
