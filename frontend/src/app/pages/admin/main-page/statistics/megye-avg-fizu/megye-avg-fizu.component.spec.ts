import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegyeAvgFizuComponent } from './megye-avg-fizu.component';

describe('MegyeAvgFizuComponent', () => {
  let component: MegyeAvgFizuComponent;
  let fixture: ComponentFixture<MegyeAvgFizuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegyeAvgFizuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MegyeAvgFizuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
