import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharStatsSkillsAttacksTraitsComponent } from './char-stats-skills-attacks-traits.component';

describe('CharStatsSkillsAttacksTraitsComponent', () => {
  let component: CharStatsSkillsAttacksTraitsComponent;
  let fixture: ComponentFixture<CharStatsSkillsAttacksTraitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharStatsSkillsAttacksTraitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharStatsSkillsAttacksTraitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
