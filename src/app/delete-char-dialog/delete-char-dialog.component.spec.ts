import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCharDialogComponent } from './delete-char-dialog.component';

describe('DeleteCharDialogComponent', () => {
  let component: DeleteCharDialogComponent;
  let fixture: ComponentFixture<DeleteCharDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCharDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCharDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
