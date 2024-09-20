import { TestBed } from '@angular/core/testing';

import { BaseStore } from './base.store';

describe('BaseService', () => {
  let service: BaseStore<any, any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
