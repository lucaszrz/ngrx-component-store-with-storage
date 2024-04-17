import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(public storage: Storage) {
    this.init().then();
  }

  async init() {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set<T>(key: string, value: T) {
    if (!this._storage) {
      from(this.init()).pipe(
        tap(() => {
          this._storage?.set(key, value);
        }),
      );
    }

    this._storage?.set(key, value);
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public get<T>(key: string): Observable<T> {
    if (!this._storage) {
      return from(this.init()).pipe(
        switchMap(() => from(this._storage?.get(key) ?? of(null))),
      );
    }

    return from(this._storage?.get(key) ?? of(null));
  }
}
