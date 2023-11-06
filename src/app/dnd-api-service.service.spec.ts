import { TestBed } from '@angular/core/testing';

import { DndApiServiceService } from './dnd-api-service.service';

describe('DndApiServiceService', () => {
  let service: DndApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DndApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
