import { inject, Injectable } from '@angular/core';
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
import { TodosService } from './todos.service';

export interface Todo {
  id: string;
  name: string;
}

export interface TodosState {
  selectedTodoId: string | null;
  todos: Todo[];
}

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  private todosService = inject(TodosService);

  constructor() {
    super({ todos: [], selectedTodoId: null });

    this.loadTodos();
  }

  readonly todos$: Observable<Todo[]> = this.select((state) => state.todos);
  readonly selectedTodo$: Observable<Todo | null> = this.select(
    (state) =>
      state.todos.find((todo) => todo.id === state.selectedTodoId) ?? null,
  );

  readonly loadTodos = this.effect<void>((trigger$) =>
    trigger$.pipe(
      exhaustMap(() => {
        return this.todosService.getTodos().pipe(
          tapResponse({
            next: (todos) => this.patchState({ todos: todos }),
            error: (error) => console.error(error),
          }),
        );
      }),
    ),
  );

  readonly addTodoUpdater = this.updater((state, todo: Todo) => ({
    todos: [...state.todos, todo],
    selectedTodoId: null,
  }));

  readonly addTodoEffect = this.effect<string>((title$) =>
    title$.pipe(
      switchMap((title) =>
        this.todosService.createTodo(title).pipe(
          tap({
            next: (todo) =>
              this.addTodoUpdater(todo).add(() =>
                console.info('Adding todo to the sync queue!', todo),
              ),
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  readonly updateTodoUpdater = this.updater((state, todos: Todo[]) => ({
    todos: todos,
    selectedTodoId: null,
  }));

  readonly updateTodoEffect = this.effect<Todo>((updatedTodo$) =>
    updatedTodo$.pipe(
      switchMap((updatedTodo) =>
        this.todosService.updateTodo(updatedTodo).pipe(
          tap({
            next: (todos) =>
              this.updateTodoUpdater(todos).add(() =>
                console.info('Adding todo to the sync queue!', updatedTodo),
              ),
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  readonly deleteTodoUpdater = this.updater((state, todos: Todo[]) => ({
    todos: todos,
    selectedTodoId: null,
  }));

  readonly deleteTodoEffect = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this.todosService.deleteTodo(id).pipe(
          tap({
            next: (todos) =>
              this.deleteTodoUpdater(todos).add(() =>
                console.info('Adding todo to the sync queue!', id),
              ),
            error: (e) => console.error(e),
          }),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  readonly selectTodoUpdated = this.updater((state, todo: Todo) => ({
    selectedTodoId: todo.id,
    todos: state.todos,
  }));
}
