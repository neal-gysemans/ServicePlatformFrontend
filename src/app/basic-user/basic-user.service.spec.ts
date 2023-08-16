import { TestBed } from '@angular/core/testing';

import { BasicUserService } from './basic-user.service';

describe('BasicUserService', () => {
  let service: BasicUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
