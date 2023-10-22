import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpContainerComponent } from './hp-container.component';

describe('HpContainerComponent', () => {
  let component: HpContainerComponent;
  let fixture: ComponentFixture<HpContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HpContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
