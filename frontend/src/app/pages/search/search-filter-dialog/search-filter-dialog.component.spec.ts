import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterDialogComponent } from './search-filter-dialog.component';

describe('SearchFilterDialogComponent', () => {
  let component: SearchFilterDialogComponent;
  let fixture: ComponentFixture<SearchFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
