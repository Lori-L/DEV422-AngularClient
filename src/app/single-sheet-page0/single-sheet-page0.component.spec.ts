import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSheetPage0Component } from './single-sheet-page0.component';

describe('SingleSheetPage0Component', () => {
  let component: SingleSheetPage0Component;
  let fixture: ComponentFixture<SingleSheetPage0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSheetPage0Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSheetPage0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
