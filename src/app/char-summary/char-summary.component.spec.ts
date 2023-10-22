import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharSummaryComponent } from './char-summary.component';

describe('CharSummaryComponent', () => {
  let component: CharSummaryComponent;
  let fixture: ComponentFixture<CharSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
