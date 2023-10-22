import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCreationClassInfoComponent } from './char-creation-class-info.component';

describe('CharCreationClassInfoComponent', () => {
  let component: CharCreationClassInfoComponent;
  let fixture: ComponentFixture<CharCreationClassInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCreationClassInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharCreationClassInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
