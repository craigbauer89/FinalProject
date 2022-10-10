import { TestBed } from '@angular/core/testing';

import { SquadraServiceService } from './squadra-service.service';

describe('SquadraServiceService', () => {
  let service: SquadraServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SquadraServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
