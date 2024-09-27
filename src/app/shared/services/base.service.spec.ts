import { TestBed } from '@angular/core/testing';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

import { BaseService } from './base.service';

interface T {
  id?: string;
}

describe('BaseService', () => {
  let service: BaseService<T>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule],
      providers: [{ provide: String, useValue: 'test-storage-key' }, Storage],
    });
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
