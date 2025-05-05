import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllaskeresoDatasComponent } from './allaskereso-datas.component';

describe('AllaskeresoDatasComponent', () => {
  let component: AllaskeresoDatasComponent;
  let fixture: ComponentFixture<AllaskeresoDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllaskeresoDatasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllaskeresoDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
