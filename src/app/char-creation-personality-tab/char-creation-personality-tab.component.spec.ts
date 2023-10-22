import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCreationPersonalityTabComponent } from './char-creation-personality-tab.component';

describe('CharCreationPersonalityTabComponent', () => {
  let component: CharCreationPersonalityTabComponent;
  let fixture: ComponentFixture<CharCreationPersonalityTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCreationPersonalityTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharCreationPersonalityTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
