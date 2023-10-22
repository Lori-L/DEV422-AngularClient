import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumBoxComponent } from './num-box.component';

describe('NumBoxComponent', () => {
  let component: NumBoxComponent;
  let fixture: ComponentFixture<NumBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
