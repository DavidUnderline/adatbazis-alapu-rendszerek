import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCompComponent } from './top-comp.component';

describe('TopCompComponent', () => {
  let component: TopCompComponent;
  let fixture: ComponentFixture<TopCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
