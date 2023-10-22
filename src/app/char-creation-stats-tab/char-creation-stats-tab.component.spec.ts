import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCreationStatsTabComponent } from './char-creation-stats-tab.component';

describe('CharCreationStatsTabComponent', () => {
  let component: CharCreationStatsTabComponent;
  let fixture: ComponentFixture<CharCreationStatsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCreationStatsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharCreationStatsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
