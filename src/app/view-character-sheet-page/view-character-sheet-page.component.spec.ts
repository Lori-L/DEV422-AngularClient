import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCharacterSheetPageComponent } from './view-character-sheet-page.component';

describe('ViewCharacterSheetPageComponent', () => {
  let component: ViewCharacterSheetPageComponent;
  let fixture: ComponentFixture<ViewCharacterSheetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCharacterSheetPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCharacterSheetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
