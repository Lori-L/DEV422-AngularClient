import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCreationNrbTabComponent } from './char-creation-nrb-tab.component';

describe('CharCreationNrbTabComponent', () => {
  let component: CharCreationNrbTabComponent;
  let fixture: ComponentFixture<CharCreationNrbTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCreationNrbTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharCreationNrbTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
