import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckNumBoxComponent } from './check-num-box.component';

describe('CheckNumBoxComponent', () => {
  let component: CheckNumBoxComponent;
  let fixture: ComponentFixture<CheckNumBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckNumBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckNumBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
