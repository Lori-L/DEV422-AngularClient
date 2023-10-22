import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCreationClassTabComponent } from './char-creation-class-tab.component';

describe('CharCreationClassTabComponent', () => {
  let component: CharCreationClassTabComponent;
  let fixture: ComponentFixture<CharCreationClassTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCreationClassTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharCreationClassTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
