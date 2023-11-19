import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSheetPage2Component } from './single-sheet-page2.component';

describe('SingleSheetPage2Component', () => {
  let component: SingleSheetPage2Component;
  let fixture: ComponentFixture<SingleSheetPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSheetPage2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSheetPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
