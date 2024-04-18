import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { Todo } from './todos.store';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private readonly storageKey = 'todos';

  private storageService = inject(StorageService);

  getTodos(): Observable<Todo[]> {
    return this.storageService.get<Todo[]>(this.storageKey).pipe(
      map((todos) => {
        if (!todos) {
          return [];
        }

        return todos;
      }),
    );
  }

  createTodo(title: string): Observable<Todo> {
    return this.getTodos().pipe(
      map((todos) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          name: title,
        };

        this.storageService.set<Todo[]>(this.storageKey, [...todos, newTodo]);

        return newTodo;
      }),
    );
  }

  updateTodo(updatedTodo: Todo): Observable<Todo[]> {
    return this.getTodos().pipe(
      map((todos) => {
        const updatedTodos: Todo[] = todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        );

        this.storageService.set<Todo[]>(this.storageKey, updatedTodos);

        return updatedTodos;
      }),
    );
  }

  deleteTodo(id: string): Observable<Todo[]> {
    return this.getTodos().pipe(
      map((todos) => {
        const filteredTodos: Todo[] = todos.filter((todo) => todo.id !== id);

        this.storageService.set<Todo[]>(this.storageKey, filteredTodos);

        return filteredTodos;
      }),
    );
  }
}
