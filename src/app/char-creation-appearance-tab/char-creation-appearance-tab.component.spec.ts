import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCreationAppearanceTabComponent } from './char-creation-appearance-tab.component';

describe('CharCreationAppearanceTabComponent', () => {
  let component: CharCreationAppearanceTabComponent;
  let fixture: ComponentFixture<CharCreationAppearanceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCreationAppearanceTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharCreationAppearanceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
