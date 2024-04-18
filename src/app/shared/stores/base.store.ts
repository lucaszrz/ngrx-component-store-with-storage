import { Inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import {
  catchError,
  EMPTY,
  exhaustMap,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import BaseModel from '../interfaces/base-model.interface';
import BaseState from '../interfaces/base-state.interface';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root',
})
export class BaseStore<
  State extends BaseState<Model>,
  Model extends BaseModel,
  Service extends BaseService<Model>,
> extends ComponentStore<State> {
  constructor(
    @Inject(Object) private initialState: State,
    @Inject(Object) private service: Service,
  ) {
    super(initialState);

    this.initialLoad();
  }

  // Selectors
  readonly items$: Observable<Model[]> = this.select((state) => state.items);
  readonly selectedItem$: Observable<Model | null> = this.select(
    (state) =>
      state.items.find((item) => item.id === state.selectedItemId) ?? null,
  );

  // Partial public updaters
  readonly setSelectedItem = this.updater(
    (state, item: Model) =>
      ({
        selectedItemId: item.id,
        items: state.items,
      }) as State,
  );

  // Initial load from storage
  readonly initialLoad = this.effect<void>((trigger$) =>
    trigger$.pipe(
      exhaustMap(() => {
        return this.service.getAll().pipe(
          tapResponse({
            next: (items) =>
              this.setState((state) => ({
                ...state,
                items,
              })),
            error: (error) => console.error(error),
          }),
        );
      }),
    ),
  );

  // Item creation flow
  private readonly addItemToState = this.updater(
    (state, item: Model) =>
      ({
        items: [...state.items, item],
        selectedItemId: null,
      }) as State,
  );

  readonly addItem = this.effect<Omit<Model, 'id'>>((item$) =>
    item$.pipe(
      switchMap((item) =>
        this.service.create(item).pipe(
          tap({
            next: (item) =>
              this.addItemToState(item).add(() =>
                console.info('Adding new item to the sync queue!', item),
              ),
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  // Item update flow
  private readonly updateItemToState = this.updater(
    (state, items: Model[]) =>
      ({
        items,
        selectedItemId: null,
      }) as State,
  );

  readonly updateItem = this.effect<Model>((updatedItem$) =>
    updatedItem$.pipe(
      switchMap((updatedItem) =>
        this.service.update(updatedItem).pipe(
          tap({
            next: (items) =>
              this.updateItemToState(items).add(() =>
                console.info(
                  'Adding updated item to the sync queue!',
                  updatedItem,
                ),
              ),
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  // Item delete flow
  private readonly deleteItemFromState = this.updater(
    (state, items: Model[]) =>
      ({
        items,
        selectedItemId: null,
      }) as State,
  );

  readonly deleteItem = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this.service.delete(id).pipe(
          tap({
            next: (items) =>
              this.deleteItemFromState(items).add(() =>
                console.info('Adding removed item to the sync queue!', id),
              ),
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
