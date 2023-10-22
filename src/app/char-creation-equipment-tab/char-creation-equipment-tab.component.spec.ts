import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCreationEquipmentTabComponent } from './char-creation-equipment-tab.component';

describe('CharCreationEquipmentTabComponent', () => {
  let component: CharCreationEquipmentTabComponent;
  let fixture: ComponentFixture<CharCreationEquipmentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCreationEquipmentTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharCreationEquipmentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
