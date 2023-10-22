import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharProficienciesEquipmentFeaturesComponent } from './char-proficiencies-equipment-features.component';

describe('CharProficienciesEquipmentFeaturesComponent', () => {
  let component: CharProficienciesEquipmentFeaturesComponent;
  let fixture: ComponentFixture<CharProficienciesEquipmentFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharProficienciesEquipmentFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharProficienciesEquipmentFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
