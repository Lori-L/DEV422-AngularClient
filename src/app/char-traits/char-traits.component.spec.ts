import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharTraitsComponent } from './char-traits.component';

describe('CharTraitsComponent', () => {
  let component: CharTraitsComponent;
  let fixture: ComponentFixture<CharTraitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharTraitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharTraitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
