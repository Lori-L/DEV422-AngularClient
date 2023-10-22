import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCreationSpellsTabComponent } from './char-creation-spells-tab.component';

describe('CharCreationSpellsTabComponent', () => {
  let component: CharCreationSpellsTabComponent;
  let fixture: ComponentFixture<CharCreationSpellsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCreationSpellsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharCreationSpellsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
