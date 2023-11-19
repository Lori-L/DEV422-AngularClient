import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSheetPage1Component } from './single-sheet-page1.component';

describe('SingleSheetPage1Component', () => {
  let component: SingleSheetPage1Component;
  let fixture: ComponentFixture<SingleSheetPage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSheetPage1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSheetPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
