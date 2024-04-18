import { Injectable } from '@angular/core';
import BaseState from '../../shared/interfaces/base-state.interface';
import Todo from '../../shared/interfaces/todo.interface';
import { BaseStore } from '../../shared/stores/base.store';
import { TodosService } from './todos.service';

export interface TodosState extends BaseState<Todo> {}

@Injectable()
export class TodosStore extends BaseStore<TodosState, Todo, TodosService> {
  constructor(private todosService: TodosService) {
    super({ items: [], selectedItemId: null }, todosService);
  }
}
