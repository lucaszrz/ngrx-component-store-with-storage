import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(public storage: Storage) {
    this.init().then();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    this._storage = await this.storage.create();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set<T>(key: string, value: T) {
    this._storage?.set(key, value);
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public get<T>(key: string): Observable<T> {
    return from(this._storage?.get(key) ?? of(null));
  }
}
