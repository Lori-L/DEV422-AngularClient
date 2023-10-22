import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharAttacksComponent } from './char-attacks.component';

describe('CharAttacksComponent', () => {
  let component: CharAttacksComponent;
  let fixture: ComponentFixture<CharAttacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharAttacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharAttacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
