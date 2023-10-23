import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharAttackSpellcastingComponent } from './char-attack-spellcasting.component';

describe('CharAttackSpellcastingComponent', () => {
  let component: CharAttackSpellcastingComponent;
  let fixture: ComponentFixture<CharAttackSpellcastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharAttackSpellcastingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharAttackSpellcastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
