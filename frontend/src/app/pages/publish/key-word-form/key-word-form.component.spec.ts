import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyWordFormComponent } from './key-word-form.component';

describe('KeyWordFormComponent', () => {
  let component: KeyWordFormComponent;
  let fixture: ComponentFixture<KeyWordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyWordFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyWordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
