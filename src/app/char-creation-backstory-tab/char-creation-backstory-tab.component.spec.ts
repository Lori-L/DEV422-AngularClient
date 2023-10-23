import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCreationBackstoryTabComponent } from './char-creation-backstory-tab.component';

describe('CharCreationBackstoryTabComponent', () => {
  let component: CharCreationBackstoryTabComponent;
  let fixture: ComponentFixture<CharCreationBackstoryTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCreationBackstoryTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharCreationBackstoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
