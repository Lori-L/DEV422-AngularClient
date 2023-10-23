import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharStatBlockComponent } from './char-stat-block.component';

describe('CharStatBlockComponent', () => {
  let component: CharStatBlockComponent;
  let fixture: ComponentFixture<CharStatBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharStatBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharStatBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
