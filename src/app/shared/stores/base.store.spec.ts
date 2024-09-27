import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BaseService } from '../services/base.service';

import { BaseStore } from './base.store';

interface T {
  id?: string;
}

describe('BaseStore', () => {
  let service: BaseStore<any, any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Object,
          useValue: {
            getAll: () => of([]),
          } as unknown as BaseService<T>,
        },
      ],
    });
    service = TestBed.inject(BaseStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
