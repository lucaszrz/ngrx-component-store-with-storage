import { Inject, inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T extends { id?: string }> {
  private readonly storageKey: string;

  private storageService = inject(StorageService);

  constructor(@Inject(String) storageKey: string) {
    this.storageKey = storageKey;
  }

  getAll(): Observable<T[]> {
    return this.storageService.get<T[]>(this.storageKey).pipe(
      map((items) => {
        if (!items) {
          return [];
        }

        return items;
      }),
    );
  }

  create(payload: Omit<T, 'id'>): Observable<T> {
    return this.getAll().pipe(
      map((items) => {
        const newItem = {
          ...payload,
          id: crypto.randomUUID(),
        } as T;

        this.storageService.set<T[]>(this.storageKey, [...items, newItem]);

        return newItem;
      }),
    );
  }

  update(updatedItem: T): Observable<T[]> {
    return this.getAll().pipe(
      map((items) => {
        const updatedItems: T[] = items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item,
        );

        this.storageService.set<T[]>(this.storageKey, updatedItems);

        return updatedItems;
      }),
    );
  }

  delete(id: string): Observable<T[]> {
    return this.getAll().pipe(
      map((items) => {
        const filteredItems: T[] = items.filter((item) => item.id !== id);

        this.storageService.set<T[]>(this.storageKey, filteredItems);

        return filteredItems;
      }),
    );
  }
}
