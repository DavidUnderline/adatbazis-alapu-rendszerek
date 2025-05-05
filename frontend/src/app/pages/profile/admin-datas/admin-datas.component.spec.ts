import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDatasComponent } from './admin-datas.component';

describe('AdminDatasComponent', () => {
  let component: AdminDatasComponent;
  let fixture: ComponentFixture<AdminDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDatasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
