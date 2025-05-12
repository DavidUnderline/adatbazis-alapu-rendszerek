import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMiniComponent } from './work-mini.component';

describe('WorkMiniComponent', () => {
  let component: WorkMiniComponent;
  let fixture: ComponentFixture<WorkMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkMiniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
