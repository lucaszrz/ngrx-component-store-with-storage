import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public storage = inject(Storage);

  private _storage: Storage | null = null;

  constructor() {}

  async init() {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
  }

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

  public get<T>(key: string): Observable<T> {
    if (!this._storage) {
      return from(this.init()).pipe(
        switchMap(() => from(this._storage?.get(key) ?? of(null))),
      );
    }

    return from(this._storage?.get(key) ?? of(null));
  }
}
