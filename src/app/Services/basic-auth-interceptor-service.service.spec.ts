import { TestBed } from '@angular/core/testing';

import { BasicAuthInterceptorServiceService } from './basic-auth-interceptor-service.service';

describe('BasicAuthInterceptorServiceService', () => {
  let service: BasicAuthInterceptorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicAuthInterceptorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
