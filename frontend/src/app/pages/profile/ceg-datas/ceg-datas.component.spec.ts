import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CegDatasComponent } from './ceg-datas.component';

describe('CegDatasComponent', () => {
  let component: CegDatasComponent;
  let fixture: ComponentFixture<CegDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CegDatasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CegDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
