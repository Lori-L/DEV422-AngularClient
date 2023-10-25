import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAllCharactersPageComponent } from './view-all-characters-page.component';

describe('ViewAllCharactersPageComponent', () => {
  let component: ViewAllCharactersPageComponent;
  let fixture: ComponentFixture<ViewAllCharactersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllCharactersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllCharactersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
